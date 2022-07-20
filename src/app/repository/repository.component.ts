import { Component, OnInit } from '@angular/core';
import { Repository } from '../model/repository';
import { GithubService } from '../services/github.service';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent implements OnInit {

  username: string = '';
  repositories: Repository[] = []; //original repository list.
  filteredRepositories: Repository[] = [];//filtered repository list which will keep on changing as per the user input.
  searchValue: string = ''; 
  uniqueLanguage: any[] = [];
  language: string = '';
  repositoryType: string = '';
  types: any[] = ['sources', 'forks', 'archived', 'mirrors', 'templates'];
  filterType: any[] = ['Type', 'Language'];

  constructor(private github: GithubService) { }

  ngOnInit(): void {
    this.getRepoData();
  }

  //Fetching username from Github service to filter out source repository.
  getUsername(): string {
    return this.github.getUsername;
  }

  //Getting value from select-field component and filtering out repository list with appropriate repository type.
  onSelectingRepoType(event: any) {
    console.log(event);
    this.repositoryType = event;
    this.filterRepoList(this.searchValue, this.repositoryType, this.language);
  }

  //Getting value from select-field component and filtering out repository list with appropriate language.
  onSelectingLanguage(event: any) {
    console.log(event);
    this.language = event;
    this.filterRepoList(this.searchValue, this.repositoryType, this.language);
  }

  //Fetching Repository data of particular user and storing unique languages in an array.
  getRepoData() {
    this.github.getRepos().subscribe((data) => {
      this.repositories = data;
      let language = this.repositories.map((val) => val.language);
      this.filteredRepositories = this.repositories;
      this.uniqueLanguage = [...new Set(language)].filter((val) => val !== null);
      this.username = this.getUsername();
      console.log(this.username);
      console.log('Languages: ', this.uniqueLanguage);
      console.log('User Repos Fetched: ', this.repositories);
    }, err => console.log('Fetching user repo data failed.', err))
  }

  //Logic for filtering the repository list as per input provided name, repository type and language.
  filterRepoList(value: string, type: string = '', language: string = '') {
    //checking for empty string, null and undefinedvalue
    if (language === '' || language === undefined || language === null) {
      language = 'all';
    }
    if (type === '' || type === undefined || type === null) {
      type = 'all';
    }
    //filtering repository as per user input.
    this.filteredRepositories = this.repositories.filter((val) => val.name.toLowerCase().includes(value.toLowerCase()))
      .filter((val) => type !== ' all' ? this.onRepositoryTypeSelect(type, val) : val)
      .filter((val) => language !== 'all' ? val.language === language : val);
  }

  //Function to apply condition as per repository type select.
  onRepositoryTypeSelect(typeValue: string, val: any) {
    switch (typeValue) {
      case 'sources':
        return val.owner === this.username && val.fork === false;
      case 'forks':
        return val.fork === true;
      case 'archived':
        return val.archived === true;
      case 'mirrors':
        return val.mirror_url !== null;
      case 'templates':
        return val.is_template === true;
      default:
        return val;
    }
  }

}
