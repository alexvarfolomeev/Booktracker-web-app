package com.booktracker.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<String>login(){
        return ResponseEntity.ok().body("Success");
    }
}
