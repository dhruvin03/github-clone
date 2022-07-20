import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Profile } from '../model/profile';
import { Repository } from '../model/repository';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  //Base api url.
  BASE_URL: string = 'https://api.github.com/users/Asabeneh'
  // BASE_URL: string = 'https://api.github.com/users/dhruvin03'

  //initializing profile varibale and giving it a type of Profile.
  profile: Profile = {
    id: 0,
    login: '',
    name: '',
    bio: '',
    avatar_url: '',
    following: 0,
    followers: 0
  };
  profileName: string = ''; //variable for setting username.

  repositories: Repository[] = [];//initilizing repository variable with empty array and type of Repository.

  constructor(private http: HttpClient) { }
  //setting username
  public set setUsername(v : string) {
    this.profileName = v;
  }
  //getting username
  public get getUsername() : string {
    return this.profileName 
  }
  
  //Fetching repository of a user and returning and observable with Repository type.
  getRepos(): Observable<Repository[]> {
    return this.http.get(`${this.BASE_URL}/repos`).pipe(
      map((data: any) => {
        for (let i = 0; i < data.length; i++) {
          let temp = {
            id: data[i].id,
            name: data[i].name,
            description: data[i].description,
            language: data[i].language,
            archived: data[i].archived,
            fork: data[i].fork,
            forks: data[i].forks,
            is_template: data[i].is_template,
            private: data[i].private,
            stargazers_count: data[i].stargazers_count,
            mirror_url: data[i].mirror_url,
            owner: data[i].owner.login,
            created_at: data[i].created_at,
            updated_at: data[i].updated_at
          }
          this.repositories.push(temp);
        }
        return this.repositories;
      }))
  }

  //Fetching profile data of a user and returning observable with Profile Type.
  getUserProfile(): Observable<Profile> {
    return this.http.get(this.BASE_URL).pipe(
      map((data: any) => {
        this.profile = { ...this.profile, id: data.id, login: data.login, name: data.name, bio: data.bio, avatar_url: data.avatar_url, following: data.following, followers: data.followers }
        
        return this.profile;
      })
    )
  }

}
