package myapp.mealManagement.service;

import lombok.RequiredArgsConstructor;
import myapp.mealManagement.entity.FoodEntity;
import myapp.mealManagement.repository.AllInquiryRepository;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AllInquiryService {
    private final AllInquiryRepository allInquiryRepository;

    public List<FoodEntity> get_all_foods(){
        List<FoodEntity> foods = new ArrayList<>();

        List<Map<String, Object>> queryResults = allInquiryRepository.get_all_foods();
        for(Map<String, Object> queryResult : queryResults){
            FoodEntity itemEntity = new FoodEntity(
                    (Integer) queryResult.get("id"),
                    (String) queryResult.get("name"),
                    (double) queryResult.get("calories"),
                    (double) queryResult.get("protein"),
                    (double) queryResult.get("carbs"),
                    (double) queryResult.get("fat"),
                    (double) queryResult.get("salt"),
                    (Timestamp) queryResult.get("created_at")
            );
            foods.add(itemEntity);
        }

        return foods;
    }

}
