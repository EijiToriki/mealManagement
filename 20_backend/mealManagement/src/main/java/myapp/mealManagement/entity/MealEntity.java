package myapp.mealManagement.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@AllArgsConstructor
@Data
public class MealEntity {
    private int id;
    private Date date;
    private String time;
    private String name;
    private double calories;
    private double protein;
    private double carbs;
    private double fat;
    private double salt;
}
