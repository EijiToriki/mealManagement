package myapp.mealManagement.repository;

import myapp.mealManagement.entity.RegisterMealRequestEntity;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface MealRegisterRepository {
    List<Map<String, Object>> get_all_foods(int user_id);

    int register_meal(RegisterMealRequestEntity registerMealRequestEntity);
}
