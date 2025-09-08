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

    // delete by id
    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        service.deleteById(id);
    }

    // delete by name
    @DeleteMapping("/by-name/{name}")
    public void deleteByName(@PathVariable String name) {
        service.deleteByName(name);
    }

}
