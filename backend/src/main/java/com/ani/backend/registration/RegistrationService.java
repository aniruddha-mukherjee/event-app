package com.ani.backend.registration;

import jakarta.transaction.Transactional;
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

    @Transactional
    public void deleteById(Long id) {
        repo.deleteById(id);
    }

    @Transactional
    public void deleteByName(String name) {
        repo.deleteByName(name);
    }
}
