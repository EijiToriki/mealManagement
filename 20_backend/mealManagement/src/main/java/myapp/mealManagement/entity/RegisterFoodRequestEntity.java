package myapp.mealManagement.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@AllArgsConstructor
@Data
public class RegisterFoodRequestEntity {
    private String name;
    private double calories;
    private double protein;
    private double carbs;
    private double fat;
    private double salt;
}
