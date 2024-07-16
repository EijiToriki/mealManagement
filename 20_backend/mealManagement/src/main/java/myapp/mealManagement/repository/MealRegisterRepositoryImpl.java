package myapp.mealManagement.repository;

import myapp.mealManagement.entity.RegisterMealRequestEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Repository
public class MealRegisterRepositoryImpl implements MealRegisterRepository{

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Map<String, Object>> get_all_foods(int user_id){
        String sql = "select name, calories, protein, carbs, fat, salt from food where user_id = ?";
        return jdbcTemplate.queryForList(sql, user_id);
    }

    @Override
    public int register_meal(RegisterMealRequestEntity registerMealRequestEntity){
        String sql = "insert into meal (user_id, date, time, name, calories, protein, carbs, fat, salt, created_at) " +
                "values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        int user_id = registerMealRequestEntity.getUser_id();
        LocalDate date = registerMealRequestEntity.getDate();
        String time = registerMealRequestEntity.getTime();
        String name = registerMealRequestEntity.getName();
        double calories = registerMealRequestEntity.getCalories();
        double protein = registerMealRequestEntity.getProtein();
        double carbs = registerMealRequestEntity.getCarbs();
        double fat = registerMealRequestEntity.getFat();
        double salt = registerMealRequestEntity.getSalt();

        Date now = new Date();
        Timestamp created_at = new Timestamp(now.getTime());

        return jdbcTemplate.update(sql, user_id, date, time, name, calories, protein, carbs, fat, salt, created_at);
    }
}
