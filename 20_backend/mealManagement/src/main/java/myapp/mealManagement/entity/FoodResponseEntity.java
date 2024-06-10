package myapp.mealManagement.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class FoodResponseEntity {
    private String name;
    private double calories;
    private double protein;
    private double carbs;
    private double fat;
    private double salt;
}
