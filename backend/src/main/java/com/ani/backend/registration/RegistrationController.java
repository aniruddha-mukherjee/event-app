package com.ani.backend.registration;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/registrations")
@CrossOrigin(origins = "http://localhost:5173") // React dev server
public class RegistrationController {

    private final RegistrationService service;

    public RegistrationController(RegistrationService service) {
        this.service = service;
    }

    @PostMapping
    public Registration register(@RequestBody Registration req) {
        return service.register(req.getName());
    }

    @GetMapping
    public List<Registration> listAll() {
        return service.listAll();
    }

    @DeleteMapping("/{id}")
    public void unregister(@PathVariable Long id) {
        service.unregister(id);
    }
}
