package myapp.mealManagement.service;

import lombok.RequiredArgsConstructor;
import myapp.mealManagement.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public int get_user(String name, String password){
        List<Map<String, Object>> queryResult = userRepository.get_user(name, password);

        if(queryResult.size() == 0){
            return -1;
        }else{
            return (int)queryResult.get(0).get("id");
        }
    }


    public int register_user(String name, String password){
        int registerQueryResult = userRepository.register_user(name, password);
        if(registerQueryResult != -1){
            List<Map<String, Object>> queryResult = userRepository.get_user(name, password);
            if(queryResult.size() == 0){
                return -1;
            }else{
                return (int)queryResult.get(0).get("id");
            }
        }else{
            return -1;
        }
    }
}
