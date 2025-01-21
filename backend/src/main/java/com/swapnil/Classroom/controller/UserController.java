package com.swapnil.Classroom.controller;

import com.swapnil.Classroom.entity.UserRegistration;
import com.swapnil.Classroom.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService usersService;


    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserRegistration userRegistration){

        try{
            String response= usersService.registerUser(userRegistration);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error registering user: "+e.getMessage());
        }
    }

    // Fetch user by username
    @GetMapping("/{username}")
    public UserRegistration getUserByUsername(@PathVariable String username) throws ExecutionException, InterruptedException {

        UserRegistration user=usersService.getUserByUsername(username);
        System.out.println("Username: "+user.getUsername());
        return user;
    }



    // Update an existing user
    @PutMapping("/{username}")
    public void updateUser(@PathVariable String username, @RequestBody UserRegistration user) throws ExecutionException, InterruptedException {
        user.setUsername(username);
        usersService.updateUser(user);
    }
}
