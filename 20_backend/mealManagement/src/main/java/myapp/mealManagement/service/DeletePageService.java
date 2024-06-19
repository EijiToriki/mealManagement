package myapp.mealManagement.service;

import lombok.RequiredArgsConstructor;
import myapp.mealManagement.entity.*;
import myapp.mealManagement.repository.DeletePageRepository;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DeletePageService {
    private final DeletePageRepository deletePageRepository;
    public FoodAndMealResponseEntity get_all_meal_food(){
        Map<String, List<Map<String, Object>>> queryRslt = deletePageRepository.get_all_meal_food();

        List<Map<String, Object>> foodRslts = queryRslt.get("food");
        List<FoodEntity> foodEntities = new ArrayList<>();
        for (Map<String, Object> foodRslt : foodRslts) {
            FoodEntity foodEntity = new FoodEntity(
                    (int) foodRslt.get("id"),
                    (String) foodRslt.get("name"),
                    (double) foodRslt.get("calories"),
                    (double) foodRslt.get("protein"),
                    (double) foodRslt.get("carbs"),
                    (double) foodRslt.get("fat"),
                    (double) foodRslt.get("salt")
            );
            foodEntities.add(foodEntity);
        }

        List<Map<String, Object>> mealRslts = queryRslt.get("meal");
        List<MealEntity> mealEntities = new ArrayList<>();
        for (Map<String, Object> mealRslt : mealRslts) {
            MealEntity mealEntity = new MealEntity(
                    (int) mealRslt.get("id"),
                    (Date) mealRslt.get("date"),
                    (String) mealRslt.get("time"),
                    (String) mealRslt.get("name"),
                    (double) mealRslt.get("calories"),
                    (double) mealRslt.get("protein"),
                    (double) mealRslt.get("carbs"),
                    (double) mealRslt.get("fat"),
                    (double) mealRslt.get("salt")
            );
            mealEntities.add(mealEntity);
        }

        return new FoodAndMealResponseEntity(foodEntities, mealEntities);
    }

    public int delete_one_meal(int id){
        return deletePageRepository.delete_one_meal(id);
    }

    public int delete_one_food(int id){
        return deletePageRepository.delete_one_food(id);
    }
}
