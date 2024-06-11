package myapp.mealManagement.repository;

import myapp.mealManagement.entity.RegisterFoodRequestEntity;
import myapp.mealManagement.entity.RegisterMealRequestEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Date;

@Repository
public class FoodRegisterRepositoryImpl implements FoodRegisterRepository{
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public int register_food(RegisterFoodRequestEntity registerFoodRequestEntity){
        String sql = "insert into food (name, calories, protein, carbs, fat, salt, created_at) " +
                "values (?, ?, ?, ?, ?, ?, ?)";

        String name = registerFoodRequestEntity.getName();
        double calories = registerFoodRequestEntity.getCalories();
        double protein = registerFoodRequestEntity.getProtein();
        double carbs = registerFoodRequestEntity.getCarbs();
        double fat = registerFoodRequestEntity.getFat();
        double salt = registerFoodRequestEntity.getSalt();

        Date now = new Date();
        Timestamp created_at = new Timestamp(now.getTime());

        return jdbcTemplate.update(sql, name, calories, protein, carbs, fat, salt, created_at);
    }

}
