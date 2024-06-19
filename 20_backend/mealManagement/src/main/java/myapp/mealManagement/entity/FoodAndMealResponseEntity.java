package myapp.mealManagement.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Data
public class FoodAndMealResponseEntity {
    private List<FoodEntity> foodEntities;
    private List<MealEntity> mealEntities;
}
