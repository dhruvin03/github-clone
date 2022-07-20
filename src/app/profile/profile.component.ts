import { Component, OnInit } from '@angular/core';
import { Profile } from '../model/profile';
import { GithubService } from '../services/github.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile: Profile = {
    id: 0,
    login: '',
    name: '',
    bio: '',
    avatar_url: '',
    following: 0,
    followers: 0
  };
  
  constructor(private github: GithubService) { }

  ngOnInit(): void {
    this.getProfileData();
  }

  //fetching profile data of the user.
  getProfileData() {
    this.github.getUserProfile().subscribe((data) => {
      this.profile = data;
      this.github.setUsername = this.profile.login;
      console.log('User Profile: ', this.profile);
    }, err => {
      alert('Error while fetching data. Kinldy refresh the page.');
      console.log('Fetching user profile data failed.', err)}
      );
  }

}
