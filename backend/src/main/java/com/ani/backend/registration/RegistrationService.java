package com.ani.backend.registration;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RegistrationService {

    private final RegistrationRepository repo;

    public RegistrationService(RegistrationRepository repo) {
        this.repo = repo;
    }

    public Registration register(String name) {
        return repo.save(new Registration(name));
    }

    public List<Registration> listAll() {
        return repo.findAll();
    }

    public void unregister(Long id) {
        repo.deleteById(id);
    }
}
