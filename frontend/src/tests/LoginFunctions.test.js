import { render, screen,waitFor } from '@testing-library/react';
import { callLogin, callAuth, callSignup } from '../functions/user/LoginFunctions';

export const mockSuccessLogin = [
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0aGlzaXNhbmV3dXNlcnRvdGVzdHdpdGgiLCJjdXJyZW50X3Jvb20iOiItMSIsImlhdCI6MTY5MjM5NTQ4OSwiZXhwIjoxNjkyMzk1ODQ5fQ.V5zV9PIN1mHfOd5cMNhz0v6saLSHXrsL-k9P7pVoJFA",
    "thisisanewusertotestwith"
];

const mockFailLogin = [
  "ERROR: Could not login"
];

const mockNotVerifiedLogin = [
  "ERROR: The account is not verified"
];

const mockweirdLogin = [
  "",
  ""
];

const mockAuthSuccess = {
  "status": true
};

const mockAuthFail = {
  "status": false
};

const mockAuthWeird = {
  "status": ""
};

const mockSignupSuccess = [
  "User created!"
]

const mockSignupFail = [
  "ERROR: Username/Password/Email invalid"
]

const mockSignupDuplicate = [
  "ERROR: Username exist"
]

const mockSignupError = [
  "ERROR: Could not create user"
]

const mockSignupEmailFail= [
  "ERROR: Could not send verification email"
]

afterEach(() => {
  jest.restoreAllMocks();
});

test('test login endpoint call',async ()=>{
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockSuccessLogin)
    })

    var result = "";
    
    await waitFor(() => {
      const loginCall = callLogin("thisisanewusertotestwith","thisisanewusertotestwith",error=>{
          
          if(!error)
              result = "PASS";
          else
              result = error.message;
      });
      expect(result).toEqual("PASS");
    },{timeout:3000}
    );
});

test('test invalid account',async ()=>{
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockFailLogin)
    })

    var result = "";
    
    await waitFor(() => {
      const loginCall = callLogin("thisisanewusertotestwith","thisisanewusertotestwith",error=>{
          
          if(!error)
              result = "PASS";
          else
              result = error.message;
      });
      expect(result).toEqual("Invalid username or password");
    },{timeout:3000}
    );
});

test('test unverified account',async ()=>{
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockNotVerifiedLogin)
  })

  var result = "";
  
  await waitFor(() => {
    const loginCall = callLogin("thisisanewusertotestwith","thisisanewusertotestwith",error=>{
        
        if(!error)
            result = "PASS";
        else
            result = error.message;
    });
    expect(result).toEqual("Account is not verified");
  },{timeout:3000}
  );

});

test('test unusual response from login endpoint',async ()=>{
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockweirdLogin)
  })

  var result = "";
  
  await waitFor(() => {
    const loginCall = callLogin("thisisanewusertotestwith","thisisanewusertotestwith",error=>{
        
        if(!error)
            result = "PASS";
        else
            result = error.message;
    });
    expect(result).toEqual("There was a problem logging in");
  },{timeout:3000}
  );

});

test('test invalid username/password for login',async ()=>{
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockweirdLogin)
  })

  var result = "";
  
  await waitFor(() => {
    const loginCall = callLogin("","",error=>{
        
        if(!error)
            result = "PASS";
        else
            result = error.message;
    });
    expect(result).toEqual("Invalid username or password");
  },{timeout:3000}
  );

});

test('test error from endpoint',async ()=>{
  jest.spyOn(global, 'fetch').mockImplementation(()=>{
    throw new Error("SOMETHING HAPPENED");
  })

  var result = "";
  
  await waitFor(() => {
    const loginCall = callLogin("thisisanewusertotestwith","thisisanewusertotestwith",error=>{
        
        if(!error)
            result = "PASS";
        else
            result = error.message;
    });
    expect(result).toEqual("Error: SOMETHING HAPPENED");
  },{timeout:3000}
  );

});

test('test verifying a verified jwt',async ()=>{
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockAuthSuccess)
  })

  var result = "";
  
  await waitFor(() => {
      const authCall = callAuth("testtoken",error=>{
          
          if(!error)
              result = "PASS";
          else
              result = error.message;
      });
      expect(result).toEqual("PASS");
    },{timeout:3000}
  );

});

test('test verifying an unverified jwt',async ()=>{
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockAuthFail)
  })

  var result = "";
  
  await waitFor(() => {
      const authCall = callAuth("testtoken",error=>{
          
          if(!error)
              result = "PASS";
          else
              result = error.message;
      });
      expect(result).toEqual("Error verifying");
    },{timeout:3000}
  );

});

test('test receiving weird responses from verifying a jwt',async ()=>{
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockAuthWeird)
  })

  var result = "";
  
  await waitFor(() => {
      const authCall = callAuth("testtoken",error=>{
          
          if(!error)
              result = "PASS";
          else
              result = error.message;
      });
      expect(result).toEqual("Error verifying");
    },{timeout:3000}
  );

});

test('test error from authentication endpoint',async ()=>{
  jest.spyOn(global, 'fetch').mockImplementation(()=>{
    throw new Error("SOMETHING HAPPENED");
  })

  var result = "";
  
  await waitFor(() => {
      const authCall = callAuth("testtoken",error=>{
          
          if(!error)
              result = "PASS";
          else
              result = error.message;
      });
      expect(result).toEqual("Error verifying");
    },{timeout:3000}
  );
});

test('test complete signup',async ()=>{
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockSignupSuccess)
  })

  var result = "";
  
  await waitFor(() => {
      const signUpCall = callSignup("usernameusernameusername", "email@email.com", "passwordusernameusername", error=>{
          
          if(!error)
              result = "PASS";
          else
              result = error.message;
      });
      expect(result).toEqual("PASS");
    },{timeout:3000}
  );
});

test('test duplicate attempt signup',async ()=>{
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockSignupDuplicate)
  })

  var result = "";
  
  await waitFor(() => {
      const signUpCall = callSignup("usernameusernameusername", "email@email.com", "passwordusernameusername", error=>{
          
          if(!error)
              result = "PASS";
          else
              result = error.message;
      });
      expect(result).toEqual("The username already exists");
    },{timeout:3000}
  );
});

test('test invalid username signup',async ()=>{
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockSignupFail)
  })

  var result = "";
  
  await waitFor(() => {
      const signUpCall = callSignup("a", "emai", "a", error=>{
          
          if(!error)
              result = "PASS";
          else
              result = error.message;
      });
      expect(result).toEqual("Invalid username, email, or password");
    },{timeout:3000}
  );
});

test('test error from signup endpoint',async ()=>{
  jest.spyOn(global, 'fetch').mockImplementation(()=>{
    throw new Error("SOMETHING HAPPENED");
  })

  var result = "";
  
  await waitFor(() => {
      const signUpCall = callSignup("passwordusernameusername", "email@email.com", "passwordusernameusername", error=>{
          
          if(!error)
              result = "PASS";
          else
              result = error.message;
      });
      expect(result).toEqual("Error: SOMETHING HAPPENED");
    },{timeout:3000}
  );
});

//test('',()=>{});
//test('',()=>{});
