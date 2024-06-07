package myapp.mealManagement.repository;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface PreProcRepository {
    List<Map<String, Object>> get_all_foods();

    void insert_dummy_food(int num);

    void insert_dummy_meal(int num);
}
