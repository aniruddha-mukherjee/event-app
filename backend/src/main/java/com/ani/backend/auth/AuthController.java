package com.ani.backend.auth;

import com.ani.backend.auth.dto.AuthResponse;
import com.ani.backend.auth.dto.LoginRequest;
import com.ani.backend.auth.dto.SignupRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // React dev server
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        try {
            User user = userService.registerUser(
                request.getUsername(),
                request.getEmail(),
                request.getPassword()
            );

            String token = jwtUtil.generateToken(user.getUsername());
            AuthResponse response = new AuthResponse(token, user.getUsername(), user.getEmail());
            
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            User user = userService.authenticateUser(
                request.getUsername(),
                request.getPassword()
            );

            String token = jwtUtil.generateToken(user.getUsername());
            AuthResponse response = new AuthResponse(token, user.getUsername(), user.getEmail());
            
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}