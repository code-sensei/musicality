import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Artist,Album,Track,User,Playlist,Session} from 'spotify-client';
import 'rxjs/add/operator/map';

/*
  Generated class for the SpotifyProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SpotifyProvider {

      request_token: string = 'AQAQHdtcJ0_0FDF5kD1ohzixO3QqRtK59Yh_rrrii4m0LXV2Mh3Erirr6hMOoKgLlsX_4yR5A6TzqmA97WiqP9wsyW55lQw2nKQlG2FF1Mwix-ZC0urCH-SSx-WNGKvym34';
      client_id: string = '05826601a44c4bd1bd2d19b163ab0d71';
      client_secret: string = '4e4ef9e4f0ac4ca98f66debb958dbb2d'

      tracks: any = [];

  constructor(public http: Http) {
    console.log('Hello SpotifyProvider Provider');
  }

  authorize() {
        // Edit redirect_uri to official musicality redirect            
      //   this.http.get('https://accounts.spotify.com/authorize?client_id=05826601a44c4bd1bd2d19b163ab0d71&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8888%2Fcallback%2&scope=user-read-private%20user-read-email')
      //       .map(res => res.json())
      //       .subscribe((result) => {
      //             console.log(result)
      //             //this.auth_code = result;
      //             console.log('Authorization Successful');
      //       })

      // GEt token
      // let headers = new Headers();
      // headers.append('Authorization', 'Basic <MDU4MjY2MDFhNDRjNGJkMWJkMmQxOWIxNjNhYjBkNzE=:NGU0ZWY5ZTRmMGFjNGNhOThmNjZkZWJiOTU4ZGJiMmQ=>')
      // let opts = new RequestOptions();
      // opts.headers = headers
      // this.http.post('https://accounts.spotify.com/api/token', {
      //       grant_type: 'authorization_code',
      //       code: this.auth_code,
      //       //Use official redirect_uri
      //       redirect_uri: 'http://localhost:8888/callback/',
      //       client_id: '05826601a44c4bd1bd2d19b163ab0d71',
      //       client_secret: '4e4ef9e4f0ac4ca98f66debb958dbb2d'
      // }).map((res) => res.json())
      //   .subscribe((result) => {
      //         console.log(result)
      //         //this.auth_token = result.access_token;
      //   })
  }

  discover(keyword: string) {

      // Session.config({
      //       clientId: this.client_id, 
      //       secretId: this.client_secret,
      //       scopes: ['playlist-modify-public'],
      //       redirect_uri: 'http://localhost:8888/callback/'
      //   });
         
      //   let token = window.location.hash.split('&')[0].split('=')[1];
      //   if( token ){
      //       Session.token = token;
      //   } else {
      //       Session.login().then( url => {
      //           window.location.href = url;
      //       });
      //   }

      //   User.findMe().then( me => {
      //       console.log(`I am: ${me.display_name}`);
      //   });

      var spotifyWebApi = require('spotify-web-api-node');
      var refresh = require('spotify-refresh');

      


      // refresh(this.request_token, this.client_id, this.client_secret, (err, res, body) => {
      //       if (err) return
      //       body = JSON.parse(body);
      //       console.log(JSON.stringify(body))
      // });

      var spotify = new spotifyWebApi({
            clientId: '05826601a44c4bd1bd2d19b163ab0d71',
            clientSecret: '4e4ef9e4f0ac4ca98f66debb958dbb2d',
            redirect_uri: 'http://localhost:8100/'
      });

      spotify.setAccessToken('BQCceXb7brtm5KOgwHuPvwLpcBDGD61OM9N2PWX6CYd13w52edFcZ9BzFhtdPXWSx6iY86AyY5DfOTUSPLP-RdLZ6ptGAORPQLwXDol9n1R_AX4fjdc2rg-vkKwvy34FnHKdMuKVi7gHP4e4VAAG5HK08uWMqawInnuWoCMB_PfoBeBuNfM');

      spotify.searchTracks(keyword).then((res) => {
                        console.log(res)
                        this.tracks = res.body.tracks.items;
                        console.log(this.tracks);
                  })

      // spotify.searchTracks(keyword).then((err, res, body) => {
      //       if (err) {
      //             let base64 = btoa(this.client_id + ':' + this.client_secret);
      //             let header = new Headers();
      //             header.append('Authorization', base64);
      //             let opts = new RequestOptions();
      //             opts.headers = header;

      //             this.http.post('https://accounts.spotify.com/api/token', {
      //                   grant_type: 'refresh_token',
      //                   refresh_token: this.request_token
      //             }, opts).map(res => res.json())
      //             .subscribe((result) => {
      //                   alert(JSON.stringify(result));
      //             })

                  // body = JSON.parse(body);
                  // console.log(body)
                  // console.log(JSON.stringify(body));
                  // spotify.setAccessToken(body.access_token);

                  //Commence Search
            //       spotify.searchTracks(keyword).then((res) => {
            //             console.log(res)
            //             this.tracks = res.body.tracks.items;
            //             console.log(this.tracks);
            //       })
      //       }
      //       // console.log(res)
      //       // this.tracks = res.body.tracks.items;
      //       // console.log(this.tracks);
      // }).catch((err) => {
      //       console.log('Error: ' + err);
      // })

      //   console.log('Spotify search started')
      //   let headers = new Headers();
      //   headers.append('Authorization', 'Bearer' + 'BQD8brgjpQvEaKJn_nPIMG7jSF2NSkTFBIziSkuJNac6SnN0Tmv-x9OwZJpKbh73ezjIyhEOL58i7aU6w5kTZiCZlnwsAF-Yf4BHutQJn13ml1whP4dxEaaVs5lU9UcnfdSg3qWhKwPQUTFgYC1U1it_ixMFYFr_a4Pp554fdIdtMipmCz0')
      //   //headers.append('Authorization', 'Bearer' + 'BQBsgfq4csEiUxC8CdXNJUX1bFt0wLD6taJIqBUeAQofLqFZ3dNeUx7ukLmM__JjLR35-JKSUvfD0_SIluL8IMwxoI1NgbK3eC1RhYr4uPH2d-w5RMocDIl_I13k3nUVA1IpTswfP7uGlqDYwdZh4ZMV0367PySlxZwCIoTSbdlS7Xj_giQ')
      //   var opts = new RequestOptions();
      //   opts.headers = headers;
        
      //   this.http.get('https://api.spotify.com/v1/search?q=' + keyword, opts).map((res) => res.json()).subscribe((result) => {
      //       console.log(result)
      //   })
  }

}
