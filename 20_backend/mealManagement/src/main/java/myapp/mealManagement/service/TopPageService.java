package myapp.mealManagement.service;

import lombok.RequiredArgsConstructor;
import myapp.mealManagement.entity.OneweekCaloriesResponseEntity;
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

    public OneweekCaloriesResponseEntity get_oneweek_calories(){
        List<Map<String, Object>> queryResults = topPageRepository.get_oneweek_calories();

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Map<String, Double> dateColoryMap = new HashMap<>();
        for(Map<String, Object> queryResult : queryResults){
            dateColoryMap.put(
                    dateFormat.format((Date) queryResult.get("date")),
                    (Double) queryResult.get("total_calories")
            );
        }

        List<Date> oneWeek = generatePastWeekDates();
        for (Date date : oneWeek) {
            String formatted_date = dateFormat.format(date);
            if(!dateColoryMap.containsKey(formatted_date)){
                dateColoryMap.put(
                        formatted_date, 0.0
                );
            }
        }

        dateColoryMap = new TreeMap<>(dateColoryMap);

        List<String> dates = new ArrayList<>();
        List<Double> calories = new ArrayList<>();

        for (Map.Entry<String, Double> entry : dateColoryMap.entrySet()) {
            dates.add(entry.getKey());
            calories.add(entry.getValue());
        }

        return new OneweekCaloriesResponseEntity(dates, calories);
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
}
