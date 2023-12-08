import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private httpClient: HttpClient) { }

  /**
   * The getUsers function makes an HTTP GET request to retrieve a list of users from a server.
   */
  public getUsers(): any {
    return this.httpClient.get('http://localhost:8001/users')
  }

  public login(user: any): any{
    return this.httpClient.post(`http://localhost:5008/api/Account`, user)
  }

  public refresh(token: any): any{
    return this.httpClient.post(`http://localhost:5008/api/Account/Refresh`, token)
  }
}
