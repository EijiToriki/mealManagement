package myapp.mealManagement.repository;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface UserRepository {
    List<Map<String, Object>> get_user(String name, String password);

    int register_user(String name, String password);

}
