package myapp.mealManagement.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@AllArgsConstructor
@Data
public class RegisterMealRequestEntity {
    private int user_id;
    private LocalDate date;
    private String time;
    private String name;
    private double calories;
    private double protein;
    private double carbs;
    private double fat;
    private double salt;
}
