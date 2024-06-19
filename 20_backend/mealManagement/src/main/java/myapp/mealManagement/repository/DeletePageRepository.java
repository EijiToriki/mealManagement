package myapp.mealManagement.repository;

import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Repository
public interface DeletePageRepository {
    Map<String, List<Map<String, Object>>> get_all_meal_food();

    int delete_one_meal(int id);

    int delete_one_food(int id);
}
