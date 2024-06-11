package myapp.mealManagement.repository;

import myapp.mealManagement.entity.RegisterFoodRequestEntity;
import myapp.mealManagement.entity.RegisterMealRequestEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodRegisterRepository {
    int register_food(RegisterFoodRequestEntity registerFoodRequestEntity);
}
