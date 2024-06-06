package myapp.mealManagement.repository;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface AllInquiryRepository {
    List<Map<String, Object>> get_all_foods();
}
