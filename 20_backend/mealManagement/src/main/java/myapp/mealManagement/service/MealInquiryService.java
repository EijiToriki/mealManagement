package myapp.mealManagement.service;

import lombok.RequiredArgsConstructor;
import myapp.mealManagement.entity.MealInquiryResponseEntity;
import myapp.mealManagement.entity.MealResponseEntity;
import myapp.mealManagement.repository.MealInquiryRepository;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MealInquiryService {
    private final MealInquiryRepository mealInquiryRepository;
    public MealInquiryResponseEntity get_inquiry_data(LocalDate startDate, LocalDate endDate, int user_id){
        // 食事履歴の取得
        List<Map<String, Object>> queryResultsMealHistory = mealInquiryRepository.get_meal_history(startDate, endDate, user_id);
        List<MealResponseEntity> mealHistories = new ArrayList<>();
        for(Map<String, Object> queryResult : queryResultsMealHistory){
            MealResponseEntity mealResponse = new MealResponseEntity(
                    (Date) queryResult.get("date"),
                    (String) queryResult.get("time"),
                    (String) queryResult.get("name"),
                    (Double)queryResult.get("calories"),
                    (Double)queryResult.get("protein"),
                    (Double)queryResult.get("fat"),
                    (Double)queryResult.get("carbs"),
                    (Double)queryResult.get("salt")
            );
            mealHistories.add(mealResponse);

        }

        // 成分ごと日付ごとのグラフ用データの取得
        List<Map<String, Object>> queryResultsGraph = mealInquiryRepository.get_dairy_data(startDate,endDate, user_id);

        List<LocalDate> dateRangeList = generateDateRange(startDate, endDate);
        List<Double> calories = new ArrayList<>();
        List<Double> proteins = new ArrayList<>();
        List<Double> fats = new ArrayList<>();
        List<Double> carbs = new ArrayList<>();
        List<Double> salts = new ArrayList<>();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        for (LocalDate date : dateRangeList) {
            String targetDate = date.format(formatter);
            Map<String, Object> mealDataByDate = getMealDataByDate(
                    queryResultsGraph, targetDate
            );
            if(mealDataByDate != null){
                calories.add((Double) mealDataByDate.get("total_calories"));
                proteins.add((Double) mealDataByDate.get("total_protein"));
                fats.add((Double) mealDataByDate.get("total_fat"));
                carbs.add((Double) mealDataByDate.get("total_carbs"));
                salts.add((Double) mealDataByDate.get("total_salt"));
            } else {
                calories.add(0.0);
                proteins.add(0.0);
                fats.add(0.0);
                carbs.add(0.0);
                salts.add(0.0);
            }
        }

        // レスポンス用のクラスとして返す
        return new MealInquiryResponseEntity(
                mealHistories,
                dateRangeList,
                calories,
                proteins,
                fats,
                carbs,
                salts
        );
    }


    private static List<LocalDate> generateDateRange(LocalDate startDate, LocalDate endDate) {
        List<LocalDate> dateList = new ArrayList<>();

        // 開始日から終了日までの日付をリストに追加
        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            dateList.add(date);
        }
        return dateList;
    }


    private static Map<String, Object> getMealDataByDate(List<Map<String, Object>> mealData, String date) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        for (Map<String, Object> data : mealData) {
            String stringDate = dateFormat.format((Date)data.get("date"));
            if (stringDate.equals(date)) {
                return data;
            }
        }
        return null;
    }
}
