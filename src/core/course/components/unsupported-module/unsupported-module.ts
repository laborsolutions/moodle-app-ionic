// (C) Copyright 2015 Martin Dougiamas
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Component, Input, OnInit } from '@angular/core';
import { CoreCourseProvider } from '../../providers/course';
import { CoreCourseModuleDelegate } from '../../providers/module-delegate';
import { CoreSitesProvider } from '@providers/sites';
import { InAppBrowser,InAppBrowserOptions } from '@ionic-native/in-app-browser';

/**
 * Component that displays info about an unsupported module.
 */
@Component({
    selector: 'core-course-unsupported-module',
    templateUrl: 'core-course-unsupported-module.html',
})
export class CoreCourseUnsupportedModuleComponent implements OnInit {
    @Input() course: any; // The course to module belongs to.
    @Input() module: any; // The module to render.

    isDisabledInSite: boolean;
    isSupportedByTheApp: boolean;
    moduleName: string;
    siteurlk: any;
    kl: any;
    kl2: string;
    mname: any;
    options : InAppBrowserOptions = {
        location : 'no',//Or 'no' 
        hidden : 'no', //Or  'yes'
        clearcache : 'yes',
        clearsessioncache : 'yes',
        zoom : 'yes',//Android only ,shows browser zoom controls 
        hardwareback : 'yes',
        mediaPlaybackRequiresUserAction : 'no',
        shouldPauseOnSuspend : 'no', //Android only 
        closebuttoncaption : 'X', //iOS only
        disallowoverscroll : 'no', //iOS only 
        toolbar : 'yes', //iOS only 
        enableViewportScale : 'no', //iOS only 
        allowInlineMediaPlayback : 'no',//iOS only 
        presentationstyle : 'pagesheet',//iOS only 
        fullscreen : 'yes',//Windows only    
    };

    constructor(private courseProvider: CoreCourseProvider, private moduleDelegate: CoreCourseModuleDelegate,private sp:CoreSitesProvider,private iab: InAppBrowser) {
        
     }

    /**
     * Component being initialized.
     */
    ngOnInit(): void {
        console.log(this.module,'module',this.sp.getCurrentSite());
        this.kl=this.sp.getCurrentSite();
        this.kl2=this.kl.siteUrl;
        this.kl.infos['userid'];
        this.mname=this.module['modname'];

        
        this.isDisabledInSite = this.moduleDelegate.isModuleDisabledInSite(this.module.modname);
        this.isSupportedByTheApp = this.moduleDelegate.hasHandler(this.module.modname);
        this.moduleName = this.courseProvider.translateModuleName(this.module.modname);
        if(this.mname=='bigbluebuttonbn'){
            const browser = this.iab.create(`${this.kl2}/admin/tool/mobile/autologin2.php?userid=${this.kl.infos['userid']}&urltogo=${this.module.url}`,'_blank',this.options);
        }
    }
}
