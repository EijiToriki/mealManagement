package myapp.mealManagement.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class DeletePageRepositoryImpl implements DeletePageRepository{
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public Map<String, List<Map<String, Object>>> get_all_meal_food(){
        Map<String, List<Map<String, Object>>> returnMap = new HashMap<>();

        String sqlFood = "select * from food";
        List<Map<String, Object>> foodRslt = jdbcTemplate.queryForList(sqlFood);
        returnMap.put("food", foodRslt);

        String sqlMeal = "select * from meal";
        List<Map<String, Object>> mealRslt = jdbcTemplate.queryForList(sqlMeal);
        returnMap.put("meal", mealRslt);

        return returnMap;
    }

    @Override
    public int delete_one_meal(int id){
        String sql = "DELETE FROM meal WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }

    @Override
    public int delete_one_food(int id){
        String sql = "DELETE FROM food WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }
}
