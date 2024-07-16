package myapp.mealManagement.service;

import lombok.RequiredArgsConstructor;
import myapp.mealManagement.entity.FoodEntity;
import myapp.mealManagement.entity.FoodResponseEntity;
import myapp.mealManagement.entity.RegisterMealRequestEntity;
import myapp.mealManagement.repository.MealRegisterRepository;
import myapp.mealManagement.repository.PreProcRepository;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MealRegisterService {
    private final MealRegisterRepository mealRegisterRepository;

    public List<FoodResponseEntity> get_all_foods(int user_id) {
        List<FoodResponseEntity> foods = new ArrayList<>();

        List<Map<String, Object>> queryResults = mealRegisterRepository.get_all_foods(user_id);
        for (Map<String, Object> queryResult : queryResults) {
            FoodResponseEntity foodResponseEntity = new FoodResponseEntity(
                    (String) queryResult.get("name"),
                    (double) queryResult.get("calories"),
                    (double) queryResult.get("protein"),
                    (double) queryResult.get("carbs"),
                    (double) queryResult.get("fat"),
                    (double) queryResult.get("salt")
            );
            foods.add(foodResponseEntity);
        }

        return foods;
    }


    public int register_meal(RegisterMealRequestEntity registerMealRequestEntity){
        return mealRegisterRepository.register_meal(registerMealRequestEntity);
    }


}
