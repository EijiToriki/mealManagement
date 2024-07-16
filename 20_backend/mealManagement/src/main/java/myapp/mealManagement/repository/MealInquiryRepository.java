package myapp.mealManagement.repository;

import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Repository
public interface MealInquiryRepository {
    List<Map<String, Object>> get_meal_history(LocalDate startDate, LocalDate endDate, int user_id);

    List<Map<String, Object>> get_dairy_data(LocalDate startDate, LocalDate endDate, int user_id);

}
