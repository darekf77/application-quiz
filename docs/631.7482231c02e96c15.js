"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[631],{47933:(I,w,o)=>{o.d(w,{Pu:()=>v,UW:()=>u,Z5:()=>m,qg:()=>g,u4:()=>T});var l=o(6620);const g=(0,l.PH)("[question] INIT"),v=(0,l.PH)("[question] FETCH_QUESTION",(0,l.Ky)()),u=(0,l.PH)("[question] FFETCH_QUESTION_SUCCESS",(0,l.Ky)()),T=(0,l.PH)("[question] FETCH_QUESTION_ERROR",(0,l.Ky)()),m=(0,l.PH)("[question] MARK_ANSWERS",(0,l.Ky)())},25993:(I,w,o)=>{o.d(w,{B:()=>l});const l="questionsFeature"},63320:(I,w,o)=>{o.d(w,{G:()=>T,w:()=>u});var l=o(6620),g=o(25993);const v=(0,l.ZF)(g.B),u=(0,l.P1)(v,m=>m?.currentQuestion),T=(0,l.P1)(v,m=>(m?.currentQuestion?.answers||[]).filter(C=>m.selectedAnswersIds.includes(C.id)).map(C=>C.id))},26598:(I,w,o)=>{o.d(w,{EW:()=>u,GX:()=>v,b7:()=>m,dH:()=>C,ht:()=>P,iT:()=>E,jg:()=>T,tP:()=>g});var l=o(6620);const g=(0,l.PH)("[topic] FETCH_TOPIC"),v=(0,l.PH)("[topic] FETCH_TOPIC_SUCCESS",(0,l.Ky)()),u=(0,l.PH)("[topic] FETCH_TOPIC_ERROR",(0,l.Ky)()),T=(0,l.PH)("[question] SHOW_ENTER_USERNAME",(0,l.Ky)()),m=(0,l.PH)("[question] DISMISS_ENTER_USERNAME"),C=(0,l.PH)("[question] SUBMIT_SCORE",(0,l.Ky)()),E=(0,l.PH)("[question] SUBMIT_SCORE_SUCCESS",(0,l.Ky)()),P=(0,l.PH)("[question] SUBMIT_SCORE_ERROR",(0,l.Ky)())},28631:(I,w,o)=>{o.r(w),o.d(w,{TopicContainerModule:()=>wt});var l=o(35923),g=o(27664),v=o(71468),u=o(6620);const T="topicsFeature";var m=o(51415);const C=(0,u.ZF)(T),R=((0,u.P1)(C,n=>n?.currentTopic),(0,u.P1)(C,n=>n?.showInputPopup),(0,u.P1)(C,n=>n?.topicsToSubmit)),y=(0,u.P1)(m.LL.appRouterSelector,n=>Number(n.state.params.questionOid));var d=o(26598),F=o(47933),S=o(29980),M=o(21765),t=o(70459);let D=(()=>{class n{constructor(e){this.appService=e}}return n.\u0275fac=function(e){return new(e||n)(t.LFG(m.zi))},n.\u0275prov=t.Yz7({token:n,factory:n.\u0275fac}),n})();var x=o(86619),h=o(83306),_=o(63320),b=o(73044),O=o(43137),W=o(17586),A=o(1507),$=o(56);const H=new t.OlP("@sweetalert2/ngx-sweetalert2#swalProvider"),L=new t.OlP("@sweetalert2/ngx-sweetalert2#fireOnInit"),U=new t.OlP("@sweetalert2/ngx-sweetalert2#dismissOnDestroy");let Z=(()=>{class n{constructor(e){this.swalProvider=e}get swal(){return this.swalPromiseCache||this.preloadSweetAlertLibrary(),this.swalPromiseCache}preloadSweetAlertLibrary(){if(this.swalPromiseCache)return;const e=function i(a){return"function"==typeof a&&void 0===a.version}(this.swalProvider)?this.swalProvider():Promise.resolve(this.swalProvider);this.swalPromiseCache=e.then(a=>function s(a){return"function"==typeof a}(a)?a:a.default)}}return n.\u0275fac=function(e){return new(e||n)(t.LFG(H))},n.\u0275prov=t.Yz7({token:n,factory:n.\u0275fac}),n})(),J=(()=>{class n{constructor(e,i,s){this.sweetAlert2Loader=e,this.moduleLevelFireOnInit=i,this.moduleLevelDismissOnDestroy=s,this.willOpen=new t.vpe,this.didOpen=new t.vpe,this.didRender=new t.vpe,this.willClose=new t.vpe,this.didClose=new t.vpe,this.didDestroy=new t.vpe,this.confirm=new t.vpe,this.deny=new t.vpe,this.dismiss=new t.vpe,this.touchedProps=new Set,this.markTouched=this.touchedProps.add.bind(this.touchedProps),this.isCurrentlyShown=!1}set swalOptions(e){Object.assign(this,e),Object.keys(e).forEach(this.markTouched)}get swalOptions(){return[...this.touchedProps].reduce((e,i)=>({...e,[i]:this[i]}),{})}set swalVisible(e){e?this.fire():this.close()}get swalVisible(){return this.isCurrentlyShown}ngOnInit(){this.sweetAlert2Loader.preloadSweetAlertLibrary()}ngAfterViewInit(){(void 0===this.swalFireOnInit?this.moduleLevelFireOnInit:this.swalFireOnInit)&&this.fire()}ngOnChanges(e){Object.keys(e).filter(i=>!i.startsWith("swal")).forEach(this.markTouched),this.update()}ngOnDestroy(){(void 0===this.swalDismissOnDestroy?this.moduleLevelDismissOnDestroy:this.swalDismissOnDestroy)&&this.close()}fire(){var e=this;return(0,g.Z)(function*(){const i=yield e.sweetAlert2Loader.swal,s=e.swalOptions,a={...s,willOpen:f(s.willOpen,c=>{e.willOpen.emit({modalElement:c})}),didOpen:f(s.didOpen,c=>{e.isCurrentlyShown=!0,e.didOpen.emit({modalElement:c})}),didRender:f(s.didRender,c=>{e.didRender.emit({modalElement:c})}),willClose:f(s.willClose,c=>{e.isCurrentlyShown=!1,e.willClose.emit({modalElement:c})}),didClose:f(s.didClose,()=>{e.didClose.emit()}),didDestroy:f(s.didDestroy,()=>{e.didDestroy.emit()})},p=yield i.fire(a);switch(!0){case p.isConfirmed:e.confirm.emit(p.value);break;case p.isDenied:e.deny.emit();break;case p.isDismissed:e.dismiss.emit(p.dismiss)}return p;function f(c,B){return(...k)=>(B(...k),c?.(...k))}})()}close(e){var i=this;return(0,g.Z)(function*(){i.isCurrentlyShown&&(yield i.sweetAlert2Loader.swal).close(e)})()}update(e){var i=this;return(0,g.Z)(function*(){if(e&&(i.swalOptions=e),!i.isCurrentlyShown)return;const s=yield i.sweetAlert2Loader.swal,a=i.swalOptions,p=Object.keys(a).filter(s.isUpdatableParameter).reduce((f,c)=>({...f,[c]:a[c]}),{});s.update(p)})()}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(Z),t.Y36(L),t.Y36(U))},n.\u0275cmp=t.Xpm({type:n,selectors:[["swal"]],inputs:{title:"title",titleText:"titleText",text:"text",html:"html",footer:"footer",icon:"icon",iconColor:"iconColor",iconHtml:"iconHtml",backdrop:"backdrop",toast:"toast",target:"target",input:"input",width:"width",padding:"padding",background:"background",position:"position",grow:"grow",showClass:"showClass",hideClass:"hideClass",customClass:"customClass",timer:"timer",timerProgressBar:"timerProgressBar",heightAuto:"heightAuto",allowOutsideClick:"allowOutsideClick",allowEscapeKey:"allowEscapeKey",allowEnterKey:"allowEnterKey",stopKeydownPropagation:"stopKeydownPropagation",keydownListenerCapture:"keydownListenerCapture",showConfirmButton:"showConfirmButton",showDenyButton:"showDenyButton",showCancelButton:"showCancelButton",confirmButtonText:"confirmButtonText",denyButtonText:"denyButtonText",cancelButtonText:"cancelButtonText",confirmButtonColor:"confirmButtonColor",denyButtonColor:"denyButtonColor",cancelButtonColor:"cancelButtonColor",confirmButtonAriaLabel:"confirmButtonAriaLabel",denyButtonAriaLabel:"denyButtonAriaLabel",cancelButtonAriaLabel:"cancelButtonAriaLabel",buttonsStyling:"buttonsStyling",reverseButtons:"reverseButtons",focusConfirm:"focusConfirm",focusDeny:"focusDeny",focusCancel:"focusCancel",showCloseButton:"showCloseButton",closeButtonHtml:"closeButtonHtml",closeButtonAriaLabel:"closeButtonAriaLabel",loaderHtml:"loaderHtml",showLoaderOnConfirm:"showLoaderOnConfirm",preConfirm:"preConfirm",preDeny:"preDeny",imageUrl:"imageUrl",imageWidth:"imageWidth",imageHeight:"imageHeight",imageAlt:"imageAlt",inputLabel:"inputLabel",inputPlaceholder:"inputPlaceholder",inputValue:"inputValue",inputOptions:"inputOptions",inputAutoTrim:"inputAutoTrim",inputAttributes:"inputAttributes",inputValidator:"inputValidator",returnInputValueOnDeny:"returnInputValueOnDeny",validationMessage:"validationMessage",progressSteps:"progressSteps",currentProgressStep:"currentProgressStep",progressStepsDistance:"progressStepsDistance",scrollbarPadding:"scrollbarPadding",swalOptions:"swalOptions",swalFireOnInit:"swalFireOnInit",swalDismissOnDestroy:"swalDismissOnDestroy",swalVisible:"swalVisible"},outputs:{willOpen:"willOpen",didOpen:"didOpen",didRender:"didRender",willClose:"willClose",didClose:"didClose",didDestroy:"didDestroy",confirm:"confirm",deny:"deny",dismiss:"dismiss"},features:[t.TTD],decls:0,vars:0,template:function(e,i){},encapsulation:2,changeDetection:0}),n})();function Y(){return o.e(688).then(o.t.bind(o,34688,19))}let z=(()=>{class n{static forRoot(e={}){return{ngModule:n,providers:[Z,{provide:H,useValue:e.provideSwal||Y},{provide:L,useValue:e.fireOnInit||!1},{provide:U,useValue:e.dismissOnDestroy||!0}]}}static forChild(e={}){return{ngModule:n,providers:[...e.provideSwal?[Z,{provide:H,useValue:e.provideSwal}]:[],...void 0!==e.fireOnInit?[{provide:L,useValue:e.fireOnInit}]:[],...void 0!==e.dismissOnDestroy?[{provide:U,useValue:e.dismissOnDestroy}]:[]]}}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[l.ez]}),n})();const X=["usernamePopup"];function q(n,r){1&n&&(t._UZ(0,"br"),t.TgZ(1,"h2",5),t._uU(2,"Please select quiz topic \xa0 "),t.TgZ(3,"mat-icon"),t._uU(4,"arrow_upward"),t.qZA(),t._uU(5," \xa0\xa0\xa0\xa0 "),t.qZA())}function tt(n,r){if(1&n){const e=t.EpF();t._UZ(0,"br"),t.TgZ(1,"button",6),t.NdJ("click",function(){t.CHM(e);const s=t.oxw();return t.KtG(s.start())}),t._uU(2,"Press this button to "),t.TgZ(3,"strong"),t._uU(4,"START"),t.qZA()()}}function et(n,r){if(1&n){const e=t.EpF();t.TgZ(0,"button",9),t.NdJ("click",function(){t.CHM(e);const s=t.oxw().$implicit,a=t.oxw();return t.KtG(a.submit(s))}),t._uU(1,"Submit Topic"),t.qZA(),t.TgZ(2,"button",9),t.NdJ("click",function(){t.CHM(e);const s=t.oxw(2);return t.KtG(s.submit())}),t._uU(3,"Submit All Topics"),t.qZA()}}function nt(n,r){1&n&&t.GkF(0)}function ot(n,r){1&n&&t.GkF(0)}function it(n,r){if(1&n&&(t.ynx(0),t.TgZ(1,"columns-container"),t._UZ(2,"column",10),t.TgZ(3,"column",11),t.YNc(4,nt,1,0,"ng-container",12),t.qZA(),t.TgZ(5,"column",13),t.YNc(6,ot,1,0,"ng-container",12),t.qZA()(),t.BQk()),2&n){t.oxw();const e=t.MAs(6);t.xp6(3),t.Q6J("width",400),t.xp6(1),t.Q6J("ngTemplateOutlet",e),t.xp6(2),t.Q6J("ngTemplateOutlet",e)}}function st(n,r){if(1&n){const e=t.EpF();t.ynx(0),t.TgZ(1,"topic",7),t.NdJ("questionOidChanged",function(s){t.CHM(e);const a=t.oxw();return t.KtG(a.onQuestionOidChanged(s))}),t.ALo(2,"async"),t._UZ(3,"router-outlet"),t.qZA(),t._UZ(4,"br"),t.YNc(5,et,4,0,"ng-template",null,8,t.W1O),t.YNc(7,it,7,3,"ng-container",2),t.ALo(8,"async"),t.BQk()}if(2&n){const e=r.$implicit,i=t.oxw(),s=t.MAs(3);t.xp6(1),t.Q6J("topic",e)("selectedQuestionOid",t.lcZ(2,4,i.selectedQuestionOid$)),t.xp6(6),t.Q6J("ngIf",t.lcZ(8,6,i.currentQuestion$))("ngIfElse",s)}}let Q=(()=>{class n{constructor(e,i,s,a){this.store=e,this.service=i,this.route=s,this.updates$=a,this.currentTopic$=this.store.select(m.LL.selectedTopic).pipe((0,S.U)(p=>p&&x.Zf.from(p))),this.currentQuestion$=this.store.select(_.w).pipe((0,S.U)(p=>p&&x.HN.from(p))),this.selectedQuestionOid$=this.store.select(y),a.pipe((0,h.l4)(d.jg),(0,v.sL)()).subscribe(()=>{this.usernamePopup.fire()})}onQuestionOidChanged(e){var i=this;return(0,g.Z)(function*(){const s=yield(0,M.z)(i.currentTopic$);i.service.appService.go(s.topicTitleKebabCase,e)})()}start(){this.store.dispatch(d.tP())}submit(e){this.store.dispatch(d.jg({topic:e}))}handleDismiss(){this.store.dispatch(d.b7())}emailEntered(e){this.store.dispatch(d.dH({username:e}))}ngOnInit(){this.store.dispatch(F.qg())}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(u.yh),t.Y36(D),t.Y36(b.gz),t.Y36(h.eX))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-topic"]],viewQuery:function(e,i){if(1&e&&t.Gf(X,5),2&e){let s;t.iGM(s=t.CRH())&&(i.usernamePopup=s.first)}},decls:8,vars:6,consts:[["startInfo",""],["selectQuesion",""],[4,"ngIf","ngIfElse"],["title","Username input","input","text","text","Enter your username to submit answers",3,"showCancelButton","focusCancel","dismiss","confirm"],["usernamePopup",""],[2,"text-align","right"],["mat-raised-button","","color","accent",1,"start-button",3,"click"],[3,"topic","selectedQuestionOid","questionOidChanged"],["buttons",""],["mat-raised-button","","color","primary",3,"click"],["grow",""],["hideMobile","",3,"width"],[4,"ngTemplateOutlet"],["grow","","showMobile",""]],template:function(e,i){if(1&e&&(t.YNc(0,q,6,0,"ng-template",null,0,t.W1O),t.YNc(2,tt,5,0,"ng-template",null,1,t.W1O),t.YNc(4,st,9,8,"ng-container",2),t.ALo(5,"async"),t.TgZ(6,"swal",3,4),t.NdJ("dismiss",function(){return i.handleDismiss()})("confirm",function(a){return i.emailEntered(a)}),t.qZA()),2&e){const s=t.MAs(1);t.xp6(4),t.Q6J("ngIf",t.lcZ(5,4,i.currentTopic$))("ngIfElse",s),t.xp6(2),t.Q6J("showCancelButton",!1)("focusCancel",!1)}},dependencies:[l.O5,l.tP,b.lC,O.lW,W.Hw,A.a_,A.bg,A.iB,A.UO,A.uf,$.I,J,l.Ov],styles:["button[_ngcontent-%COMP%]{position:relative;float:right;margin-left:10px;margin-top:10px}.start-button[_ngcontent-%COMP%]{float:left;padding:50px;margin-bottom:20px}"]}),n})();var rt=o(96809),K=o(34741),N=o(79212),lt=o(3697),j=o(1760),at=o(85121),V=o(42190),ct=o(79861);let ut=(()=>{class n{constructor(e,i,s){this.actions$=e,this.service=i,this.store=s,this.fetchTopic=(0,h.GW)(()=>this.actions$.pipe((0,h.l4)(d.tP),(0,rt.b)(a=>(0,K.of)(a).pipe((0,N.M)(this.store.select(m.LL.selectedTopic)),(0,lt.w)(([p,{topicTitleKebabCase:f}])=>x.Zf.ctrl.getByTitleKebabCase(f).received.observable.pipe((0,S.U)(c=>d.GX({topic:c.body.rawJson})),(0,j.K)(c=>(0,K.of)(d.EW({error:c}))))))))),this.navigateToQuesiton=(0,h.GW)(()=>this.actions$.pipe((0,h.l4)(d.GX),(0,at.p)(1e3),(0,V.b)(({topic:a})=>{this.service.appService.navigateToFirstQuestion(x.Zf.from(a))})),{dispatch:!1}),this.submit=(0,h.GW)(()=>this.actions$.pipe((0,h.l4)(d.dH),(0,N.M)(this.store.select(R),this.store.select(_.G)),(0,ct.z)(([{username:a},p,f])=>x.n5.ctrl.submit(f,encodeURIComponent(a),p?p.id:void 0).received.observable.pipe((0,S.U)(c=>d.iT({user:c.body.rawJson})),(0,j.K)(c=>(0,K.of)(d.ht({error:c}))))))),this.navigateToUserStats=(0,h.GW)(()=>this.actions$.pipe((0,h.l4)(d.iT),(0,V.b)(({user:a})=>{this.service.appService.goToStats(a.username)})),{dispatch:!1})}}return n.\u0275fac=function(e){return new(e||n)(t.LFG(h.eX),t.LFG(D),t.LFG(u.yh))},n.\u0275prov=t.Yz7({token:n,factory:n.\u0275fac}),n})();var G=o(74573);const dt=(0,u.Lq)({currentTopic:void 0,showInputPopup:!1,topicsToSubmit:void 0},(0,u.on)(d.GX,(n,{topic:r})=>({...n,currentTopic:G.cloneDeep(r)})),(0,u.on)(d.jg,(n,{topic:r})=>({...n,showInputPopup:!0,topicsToSubmit:G.cloneDeep(r)})),(0,u.on)(d.b7,n=>({...n,showInputPopup:!1})));var mt=o(10839);let ht=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[l.ez]}),n})();const ft=[{path:"",pathMatch:"full",component:Q},{path:"topic/:topicTitleKebabCase",component:Q,children:[{path:"question",loadChildren:()=>o.e(948).then(o.bind(o,78948)).then(n=>n.QuestionContainerModule)}]}];let wt=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({providers:[D],imports:[l.ez,b.Bz.forChild(ft),u.Aw.forFeature(T,dt),h.sQ.forFeature([ut]),mt.a8,A.m0,x.TX,ht,z.forRoot({})]}),n})()},85121:(I,w,o)=>{o.d(w,{p:()=>C});var l=o(91250),g=o(99015),v=o(76687),u=o(19146),m=o(48143);function C(E,P=l.z,R){const y=(0,m.H)(E,P);return function T(E,P){return(0,g.e)((R,y)=>{const{leading:d=!0,trailing:F=!1}=P??{};let S=!1,M=null,t=null,D=!1;const x=()=>{t?.unsubscribe(),t=null,F&&(b(),D&&y.complete())},h=()=>{t=null,D&&y.complete()},_=O=>t=(0,u.Xf)(E(O)).subscribe((0,v.x)(y,x,h)),b=()=>{if(S){S=!1;const O=M;M=null,y.next(O),!D&&_(O)}};R.subscribe((0,v.x)(y,O=>{S=!0,M=O,(!t||t.closed)&&(d?b():_(O))},()=>{D=!0,(!(F&&S&&t)||t.closed)&&y.complete()}))})}(()=>y,R)}}}]);