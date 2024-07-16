package myapp.mealManagement.service;

import lombok.RequiredArgsConstructor;
import myapp.mealManagement.entity.OneweekCaloriesResponseEntity;
import myapp.mealManagement.entity.TodayNutritionResponseEntity;
import myapp.mealManagement.repository.TopPageRepository;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;

@Service
@RequiredArgsConstructor
public class TopPageService {
    private final TopPageRepository topPageRepository;

    public OneweekCaloriesResponseEntity get_oneweek_calories(int user_id){
        List<Map<String, Object>> queryResults = topPageRepository.get_oneweek_calories(user_id);

        // 日付とカロリーの対応付けをマップに格納する。
        // 格納時に日付をStringに変換する
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Map<String, Double> dateColoryMap = new HashMap<>();
        for(Map<String, Object> queryResult : queryResults){
            dateColoryMap.put(
                    dateFormat.format((Date) queryResult.get("date")),
                    (Double) queryResult.get("total_calories")
            );
        }

        // 1週間のうちクエリの結果に存在しない日と0キロカロリーをマップに格納する
        List<Date> oneWeek = generatePastWeekDates();
        for (Date date : oneWeek) {
            String formatted_date = dateFormat.format(date);
            if(!dateColoryMap.containsKey(formatted_date)){
                dateColoryMap.put(
                        formatted_date, 0.0
                );
            }
        }

        // 日付の若い順でソート
        dateColoryMap = new TreeMap<>(dateColoryMap);

        // 返却クラスと型を合わせるために、日付とカロリーを別の配列に移す
        List<String> dates = new ArrayList<>();
        List<Double> calories = new ArrayList<>();

        for (Map.Entry<String, Double> entry : dateColoryMap.entrySet()) {
            dates.add(entry.getKey());
            calories.add(entry.getValue());
        }

        return new OneweekCaloriesResponseEntity(dates, calories);
    }


    public List<TodayNutritionResponseEntity> get_today_nutrition(int user_id){
        // 目標値の取得
        List<Map<String, Object>> queryAverageResults = topPageRepository.get_average_nutrition();
        Map<String, Double> nutritionMap = new HashMap<>();
        for(Map<String, Object> queryResult : queryAverageResults){
            nutritionMap.put(
                    (String) queryResult.get("nutrients"),
                    (Double) queryResult.get("quantity")
            );
        }

        // 本質の栄養摂取量を取得 & レスポンス用エンティティに格納
        List<Map<String, Object>> queryTodayResults = topPageRepository.get_today_nutrition(user_id);
        List<TodayNutritionResponseEntity> todayNutritionResponseEntityList = new ArrayList<>();

        for (Map.Entry<String, Object> entry : queryTodayResults.get(0).entrySet()) {
            String element = entry.getKey();
            Double realQuantity = (Double)entry.getValue();
            Double targetQuantity = nutritionMap.get(entry.getKey());
            Double diff = Math.round(Math.abs(realQuantity - targetQuantity) * 10.0) / 10.0;
            String border = judgeBorder(targetQuantity, realQuantity);

            TodayNutritionResponseEntity todayNutritionResponseEntity = new TodayNutritionResponseEntity(
                    element, realQuantity, diff, border
            );
            todayNutritionResponseEntityList.add(todayNutritionResponseEntity);
        }

        return todayNutritionResponseEntityList;
    }


    public int get_achievement_day(int user_id){
        // 目標値の取得
        List<Map<String, Object>> queryAverageResults = topPageRepository.get_average_nutrition();
        Map<String, Double> nutritionMap = new HashMap<>();
        for(Map<String, Object> queryResult : queryAverageResults){
            nutritionMap.put(
                    (String) queryResult.get("nutrients"),
                    (Double) queryResult.get("quantity")
            );
        }

        Boolean achiveFlag = true;
        int achieveDay = 0;
        LocalDate inquiryDay = LocalDate.now().minusDays(1);
        while (true){
            List<Map<String, Object>> queryOneDayResults = topPageRepository.get_oneday_nutrition(inquiryDay, user_id);
            Map<String, Object> oneDayMap = queryOneDayResults.get(0);

            for(Map.Entry<String, Object> entry: oneDayMap.entrySet()){
                String key = entry.getKey();
                if(!judgeBorder(nutritionMap.get(key), (Double) oneDayMap.get(key)).equals("ok")){
                    achiveFlag = false;
                }
            }

            if(achiveFlag){
                achieveDay++;
                inquiryDay = inquiryDay.minusDays(1);
            }else{
                break;
            }
        }


        return achieveDay;
    }


    public static List<Date> generatePastWeekDates() {
        List<Date> dateList = new ArrayList<>();
        LocalDate today = LocalDate.now();

        // 過去6日分と今日の日付をリストに追加
        for (int i = 6; i >= 0; i--) {
            LocalDate localDate = today.minusDays(i);
            Date date = convertToDate(localDate);
            dateList.add(date);
        }

        return dateList;
    }

    private static Date convertToDate(LocalDate localDate) {
        return Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
    }

    private static String judgeBorder(Double target, Double real){
        Double lower = target * 0.9;
        Double upper = target * 1.1;

        if(real < lower){
            return "row";
        } else if (real > upper) {
            return "high";
        } else {
            return "ok";
        }
    }
}
