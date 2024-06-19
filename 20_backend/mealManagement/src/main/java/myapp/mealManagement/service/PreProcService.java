package myapp.mealManagement.service;

import lombok.RequiredArgsConstructor;
import myapp.mealManagement.entity.FoodEntity;
import myapp.mealManagement.repository.PreProcRepository;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PreProcService {
    private final PreProcRepository preProcRepository;

    public List<FoodEntity> get_all_foods(){
        List<FoodEntity> foods = new ArrayList<>();

        List<Map<String, Object>> queryResults = preProcRepository.get_all_foods();
        for(Map<String, Object> queryResult : queryResults){
            FoodEntity itemEntity = new FoodEntity(
                    (Integer) queryResult.get("id"),
                    (String) queryResult.get("name"),
                    (double) queryResult.get("calories"),
                    (double) queryResult.get("protein"),
                    (double) queryResult.get("carbs"),
                    (double) queryResult.get("fat"),
                    (double) queryResult.get("salt")
            );
            foods.add(itemEntity);
        }

        return foods;
    }


    public void insert_dummy_food(int num){
        preProcRepository.insert_dummy_food(num);
    }

    public void insert_dummy_meal(int num){
        preProcRepository.insert_dummy_meal(num);
    }

}
