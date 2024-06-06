package myapp.mealManagement.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Timestamp;

@AllArgsConstructor
@Data
public class FoodEntity {
    private int id;
    private String name;
    private double calories;
    private double protein;
    private double carbs;
    private double fat;
    private double salt;
    private Timestamp created_at;
}
