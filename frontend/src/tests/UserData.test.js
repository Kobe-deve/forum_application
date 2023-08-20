import {waitFor } from '@testing-library/react';
import { verifyCredentials } from "../information/UserData";
import { getCookie } from '../information/UserData';
import * as auth from '../functions/user/LoginFunctions';

const mockAuthSuccess = {
    "status": true,
    "token": "wediditbaby"
  };
  
const mockAuthFail = {
    "status": false
  };
  
afterEach(() => {
    jest.restoreAllMocks();
});

test('Token is cleared if it is invalid',async ()=>{
    jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockAuthFail)
      })

    Object.defineProperty(window.document, 'cookie', {
        writable: true,
        value: 't=THEREISATOKENMAN;user=THEREISAUSER;',
      });

      await waitFor(() => {
        verifyCredentials();
        expect(getCookie("t")).toEqual("");
      },{timeout:3000});
});

test('Token is cleared if there is an error',async ()=>{
    jest.spyOn(auth, 'callAuth').mockImplementation(()=>{
        throw new Error("SOMETHING HAPPENED");
    });

    Object.defineProperty(window.document, 'cookie', {
        writable: true,
        value: 't=THEREISATOKENMAN;user=THEREISAUSER;',
      });

      await waitFor(() => {
        verifyCredentials();
        expect(getCookie("t")).toEqual("");
      },{timeout:3000});
});

test('Token is renewed if it is valid',async ()=>{
    jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockAuthSuccess)
      },{timeout:3000})
    
      Object.defineProperty(window.document, 'cookie', {
        writable: true,
        value: 't=THEREISATOKENMAN;user=THEREISAUSER;',
      });

      await waitFor(() => {
        verifyCredentials();
        expect(getCookie("t")).toEqual("wediditbaby");
      },{timeout:3000});
});