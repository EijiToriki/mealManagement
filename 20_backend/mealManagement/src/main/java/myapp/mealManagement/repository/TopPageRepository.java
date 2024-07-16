package myapp.mealManagement.repository;

import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Repository
public interface TopPageRepository {
    List<Map<String, Object>> get_oneweek_calories(int user_id);

    List<Map<String, Object>> get_today_nutrition(int user_id);

    List<Map<String, Object>> get_average_nutrition();

    List<Map<String, Object>> get_oneday_nutrition(LocalDate date, int user_id);
}
