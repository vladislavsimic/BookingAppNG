import { Component, OnInit } from '@angular/core';
import {FileUploader} from "ng2-file-upload";
import {AppUrl} from "app/appservice/AppUrl.services"
import {Accommodation} from "app/accomodation/accommodation.model"
import{MdSnackBar} from '@angular/material'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Component({
  selector: 'app-imageupload',
  templateUrl: './imageupload.component.html',
  styleUrls: ['./imageupload.component.css'],
})
export class ImageuploadComponent implements OnInit {

  public accommodation:Accommodation;
  public uploader:FileUploader;
  public hasBaseDropZoneOver:boolean = false;
  public fileChoosed:boolean;
  uploadForm: FormGroup;

  constructor(private appUrl:AppUrl,
              public snackBar: MdSnackBar,
              private formBuilder: FormBuilder, private http: Http) {
  }

  ngOnInit() {
    
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });

    this.fileChoosed=false;
    
    this.uploader=new FileUploader({url:this.appUrl.RootLocation + this.appUrl.MainBackend + "images/properties/"+this.accommodation.id});
    
    this.uploader.authToken=localStorage.getItem('id_token');
    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; this.fileChoosed=true; };
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            console.log(item.file.name);
            console.log(response);
            this.accommodation.imageUrls = [item.file.name];
            this.snackBar.open(response, "", {
                                duration: 2000,
    });
        };
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('image', this.uploadForm.get('profile').value);

    this.http.post(this.appUrl.RootLocation + this.appUrl.MainBackend + "images/properties/"+this.accommodation.id, formData).subscribe(
      (res) => 
      {
        console.log(res);
        console.log('Image successfuly added');
        this.snackBar.open("Image successfuly added", "", { duration: 3000,});
      },
      (err) => console.log(err)
    );
  }

  enableChoose(){
    this.fileChoosed=false;
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }  

  getRequestOptions(){
        
    const headers: Headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-type', 'application/json');
    let access_token=localStorage.getItem('id_token');
    let token = `Bearer ${access_token}`;
    headers.append('Authorization', token);

    const opts: RequestOptions = new RequestOptions();
    opts.headers = headers;

    return opts;
}
}
