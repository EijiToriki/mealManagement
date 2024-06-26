package myapp.mealManagement.repository;

import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Repository
public interface TopPageRepository {
    List<Map<String, Object>> get_oneweek_calories();

    List<Map<String, Object>> get_today_nutrition();

    List<Map<String, Object>> get_average_nutrition();

    List<Map<String, Object>> get_oneday_nutrition(LocalDate date);
}
