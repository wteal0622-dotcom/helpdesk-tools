// Call Notes Trainer: practice calls. All callers, names and numbers are made up.
// lines: ['c', caller text] | ['a', agent script]. curve = extra caller detail added on Level 2+.
// facts: [label, [matchers]]. A matcher is a word/phrase (fuzzy, any order) or '/regex/'.
window.SCENARIOS = [
{
  id:'lockout', title:'Account locked out',
  lines:[
    ['c',"Hi, this is Maria Lopez in the Denver office. I can't get logged into my computer this morning."],
    ['a',"Sorry about that, Maria. I can help. What message do you see on the screen?"],
    ['c',"It says my account is locked. I changed my password on Friday from my phone, and my username is M Lopez 2."],
    ['a',"Thanks. Let me pull up your account and take a look at that lockout for you."],
    ['c',"Okay. I tried my new password three times before I called."],
    ['a',"I see the lockout. I'm unlocking it now. Go ahead and try your new password one more time."],
    ['c',"Okay, typing it in... and I'm in. That worked."],
    ['a',"Great. Since you changed it on your phone, update the password in your phone's email app too, or it can lock you out again."],
    ['c',"Oh, that's probably what did it. I'll update my phone right now. Thanks."]
  ],
  curve:{after:2, text:"Actually, sorry, I changed it Thursday night, not Friday."},
  facts:[
    ['Caller: Maria Lopez',['maria','lopez']],
    ['Location: Denver office',['denver']],
    ['Account locked out',['lock']],
    ['Username: mlopez2',['/lopez\\W?\\s*(2|two)/','mlopez']],
    ['Password changed from phone',['phone','mobile','cell']],
    ['Resolution: account unlocked',['unlock']],
    ['Next step: update password on phone email app',['/(update|change).{0,40}(phone|mobile|email app|mail app)/','/(phone|mobile).{0,40}(update|change)/']]
  ],
  curveFact:['Correction: changed Thursday, not Friday',['thursday','thurs']]
},
{
  id:'mfa', title:'New phone, no sign-in codes',
  lines:[
    ['c',"Hey, this is James Carter. I got a new phone over the weekend and now I can't get my sign-in codes."],
    ['a',"No problem, James. Do you still have your old phone with you?"],
    ['c',"No, I traded it in at the store. The new one is an iPhone, the old one was an Android."],
    ['a',"Got it. Since the old phone is gone, I'll verify you first, then clear the old sign-in method."],
    ['c',"Sure. My employee ID is 4 8 2 1 3."],
    ['a',"Thanks, you're verified. I've cleared the old method. On your computer, open security info and choose add sign-in method."],
    ['c',"Okay, there's a QR code. I scanned it with the app, and it says added."],
    ['a',"Perfect. Let's do a test sign-in so we know it works before we hang up."],
    ['c',"It sent me a number, I typed it in, and I'm signed in. Thanks!"]
  ],
  curve:{after:6, text:"Oh, and Outlook on the new phone keeps asking for my password too."},
  facts:[
    ['Caller: James Carter',['james','carter']],
    ['New phone, no MFA codes',['/(code|mfa|authenticat|sign.?in)/']],
    ['Old phone traded in / not available',['trade','traded','/old phone.{0,30}(gone|not|no)/']],
    ['New phone is an iPhone (was Android)',['iphone']],
    ['Employee ID: 48213',['/4\\s*8\\s*2\\s*1\\s*3/']],
    ['Cleared old method',['/(clear|remov|reset|delet).{0,30}(method|mfa|authenticat|old)/']],
    ['Registered new phone, test sign-in worked',['/(test|signed in|works|worked|success|registered|added)/']]
  ],
  curveFact:['Also: Outlook on phone asking for password',['outlook']]
},
{
  id:'vpn', title:'VPN will not connect',
  lines:[
    ['c',"Hi, this is Priya Shah. I'm working from home and the VPN won't connect."],
    ['a',"Thanks, Priya. What happens when you try to connect?"],
    ['c',"It spins for a while and then gives me error 8 0 9, connection timed out. I already restarted my laptop."],
    ['a',"Okay. Are other websites working on your home internet?"],
    ['c',"Yes, everything else works fine. Netflix, email on the web, all of it."],
    ['a',"Let's try your phone's hotspot. Connect the laptop to your phone and try the VPN again."],
    ['c',"Okay, I'm on my hotspot now... and it connected right away."],
    ['a',"That tells us it's your home router blocking it. Restart your router, and if it still fails on home Wi-Fi, call us back."],
    ['c',"Okay. I'll restart the router after lunch. Thanks."]
  ],
  curve:{after:4, text:"And it started yesterday afternoon. It was fine before that."},
  facts:[
    ['Caller: Priya Shah',['priya','shah']],
    ['Working from home',['home','remote','wfh']],
    ['VPN will not connect',['vpn']],
    ['Error 809 / timed out',['809']],
    ['Already restarted laptop',['restart','reboot']],
    ['Works on phone hotspot',['hotspot']],
    ['Next step: restart home router, call back if it fails',['router']]
  ],
  curveFact:['Started yesterday afternoon',['yesterday']]
},
{
  id:'printer', title:'Floor printer down',
  lines:[
    ['c',"Hi, this is Tom Becker on the third floor. Our printer says paper jam, but there's no paper stuck anywhere."],
    ['a',"Thanks, Tom. Do you know the printer name? It's on a sticker on the front."],
    ['c',"It says P R N 3 E. And it's not just me, nobody on the floor can print."],
    ['a',"Okay. Have you tried turning it off and back on?"],
    ['c',"Yes, I power cycled it twice. Still says jam."],
    ['a',"Let me check the print queue on our side. I see a stuck job at the top. I'm clearing it now."],
    ['c',"Oh, it's printing now! Everything's coming out."],
    ['a',"Great. That stuck job was holding up the whole queue. If it happens again, call us and we'll clear it."],
    ['c',"Will do. Thanks a lot."]
  ],
  curve:{after:2, text:"And there are about five people standing here waiting on it, so it's kind of urgent."},
  facts:[
    ['Caller: Tom Becker',['tom','becker']],
    ['Third floor',['third','3rd']],
    ['Printer: PRN-3E',['/prn\\W?\\s*3\\s*e/','3e']],
    ['Paper jam error, no paper stuck',['jam']],
    ['Whole floor affected',['/(everyone|nobody|whole|entire|all users|multiple|others|other users|floor)/']],
    ['Power cycled already',['/power|cycle|restart|reboot|off and on/']],
    ['Resolution: cleared stuck job in queue',['queue','/stuck job|cleared|clear job/']]
  ],
  curveFact:['Urgent: about 5 people waiting',['/(five|5) (people|users|ppl)/','urgent']]
},
{
  id:'headset', title:'Callers cannot hear me',
  lines:[
    ['c',"Hi, this is Linda Park. I got a new Jabra headset and the people on my Teams calls can't hear me."],
    ['a',"Thanks, Linda. Can you hear them okay?"],
    ['c',"Yes, I hear them fine. They just can't hear me. It's the USB one."],
    ['a',"Have you tried unplugging it and plugging it back in?"],
    ['c',"Yes, a couple of times. Same thing."],
    ['a',"Okay. In Teams, click your picture, then settings, then devices. Set the microphone to the Jabra."],
    ['c',"It was set to the laptop microphone. I changed it to Jabra."],
    ['a',"Great. Now make a test call from that same screen and say a few words."],
    ['c',"I can hear myself on the playback. It works!"]
  ],
  curve:{after:4, text:"The old headset worked fine on Monday, before they swapped it."},
  facts:[
    ['Caller: Linda Park',['linda','park']],
    ['New Jabra headset (USB)',['jabra']],
    ['Others cannot hear her (mic)',['/can.?t hear|cannot hear|no audio|mic/']],
    ['In Teams calls',['teams']],
    ['Already unplugged / replugged',['/unplug|replug|plug/']],
    ['Mic was set to laptop, changed to Jabra in Teams settings',['/setting|device|default|changed/']],
    ['Test call worked',['/test/']]
  ],
  curveFact:['Old headset worked on Monday',['monday']]
},
{
  id:'software', title:'Software install request',
  lines:[
    ['c',"Hi, Kevin Nguyen here. I need Adobe Acrobat Pro installed. I have to edit PDFs for a project."],
    ['a',"Sure, Kevin. That one needs your manager's approval. Who's your manager?"],
    ['c',"Sarah Mills. My computer name is L T 5 5 8 1 2."],
    ['a',"Thanks. I'll put in the request and send it to the software team for approval and install."],
    ['c',"How long does that usually take?"],
    ['a',"Usually one to two business days once your manager approves. You'll get an email when it's installed."],
    ['c',"Okay, that works. Thanks."]
  ],
  curve:{after:2, text:"Oh, and Sarah already emailed her approval this morning."},
  facts:[
    ['Caller: Kevin Nguyen',['kevin','nguyen']],
    ['Needs Adobe Acrobat Pro',['/acrobat|adobe/']],
    ['Reason: edit PDFs',['pdf']],
    ['Manager: Sarah Mills',['/sarah|mills/']],
    ['Computer: LT-55812',['55812']],
    ['Routed to software team',['/software team|route|assign|escalat|sent to/']],
    ['Timeline: 1-2 business days',['/(1|one)\\s*(-|to)\\s*(2|two)|business day|48/']]
  ],
  curveFact:['Manager already emailed approval',['/approv/']]
},
{
  id:'access', title:'Shared folder access',
  lines:[
    ['c',"Hi, this is Angela Brooks. I can't open the Finance shared folder. It says access denied."],
    ['a',"Thanks, Angela. Did you have access before?"],
    ['c',"No, I just moved to the finance team last week. I need to be able to open and save files there."],
    ['a',"Okay, so read and write access. Who's your new manager?"],
    ['c',"Robert Hale."],
    ['a',"I'll submit an access request. The folder owner has to approve it, and you'll get an email when it's done."],
    ['c',"Great, thank you."]
  ],
  curve:{after:2, text:"Oh, I only need it until the end of the month, it's a temporary project."},
  facts:[
    ['Caller: Angela Brooks',['angela','brooks']],
    ['Folder: Finance shared folder',['finance']],
    ['Error: access denied',['denied']],
    ['Moved to new team last week',['/new team|moved|transfer|last week/']],
    ['Needs read and write',['/read|write|modify|save/']],
    ['Manager: Robert Hale',['/robert|hale/']],
    ['Submitted access request, owner must approve',['/request|submit|owner|approv/']]
  ],
  curveFact:['Temporary: until end of month',['/end of (the )?month|temporar|eom/']]
},
{
  id:'outlook', title:'Outlook keeps crashing',
  lines:[
    ['c',"Hi, this is Marcus Hill. Outlook closes as soon as I open it. It says Outlook has stopped working."],
    ['a',"Sorry, Marcus. When did it start?"],
    ['c',"This morning. My computer did an update last night. I already restarted it twice."],
    ['a',"Let's open Outlook in safe mode. Hold the control key and click the Outlook icon."],
    ['c',"Okay, it's asking about safe mode. I said yes... and it opened."],
    ['a',"Good, so it's probably an add-in. Go to file, options, add-ins, and turn off the PDF add-in."],
    ['c',"Done. I closed it and opened it normally. It's working now."],
    ['a',"Great. If it crashes again today, call us back and reference this ticket."],
    ['c',"Will do, thanks."]
  ],
  curve:{after:2, text:"And just so you know, the web version of Outlook works fine."},
  facts:[
    ['Caller: Marcus Hill',['marcus','hill']],
    ['Outlook crashes on open',['outlook']],
    ['Error: stopped working',['/stopped|crash|closes/']],
    ['Started after update last night',['update']],
    ['Already restarted twice',['/restart|reboot/']],
    ['Safe mode worked',['safe']],
    ['Resolution: disabled PDF add-in',['/add.?in|addon|plugin/']]
  ],
  curveFact:['Outlook on the web works',['web','owa','browser']]
},
{
  id:'disk', title:'Laptop very slow',
  lines:[
    ['c',"Hi, this is Susan Grant. My laptop is crawling, and I keep getting a warning that I'm low on disk space."],
    ['a',"Thanks, Susan. Can you read me the asset tag on the bottom of the laptop?"],
    ['c',"It says 7 7 1 9."],
    ['a',"Thanks. Let me connect and look. You only have 2 gigs free, and your Downloads folder is 60 gigs."],
    ['c',"Oh wow. I never clean that out. You can delete the old stuff."],
    ['a',"Okay, I'm running disk cleanup and clearing old downloads and temp files now. You're at 38 gigs free."],
    ['c',"It already feels faster."],
    ['a',"Great. Going forward, save files to OneDrive instead of Downloads so this doesn't happen again."],
    ['c',"Got it. Thank you!"]
  ],
  curve:{after:2, text:"It's been slow for about two weeks now."},
  facts:[
    ['Caller: Susan Grant',['susan','grant']],
    ['Laptop slow, low disk space warning',['/slow|disk|space|storage/']],
    ['Asset tag: 7719',['7719']],
    ['Only 2 GB free',['/\\b2\\s*(gb|gig|g\\b)|2 gigs/']],
    ['Downloads folder very large',['download']],
    ['Resolution: disk cleanup, now 38 GB free',['/cleanup|clean up|cleared|38/']],
    ['Next step: save to OneDrive',['/one\\s?drive/']]
  ],
  curveFact:['Slow for about two weeks',['/(two|2)\\s*(weeks|wks)/']]
},
{
  id:'phish', title:'Clicked a suspicious link',
  lines:[
    ['c',"Hi, this is Rachel Kim. I think I did something bad. I clicked a link in an email about a package delivery."],
    ['a',"Thanks for calling right away, Rachel. Did it ask you for anything?"],
    ['c',"Yes, it asked me to sign in, and I typed my password before I realized it looked wrong."],
    ['a',"Okay. I'm resetting your password now and signing you out of all sessions to be safe."],
    ['c',"Okay. Should I delete the email?"],
    ['a',"Don't delete it yet. Use the report phishing button so security can see it. I'm also sending this to the security team."],
    ['c',"Okay, I reported it. What happens now?"],
    ['a',"The security team will follow up with you today. Your new temporary password is coming by text."],
    ['c',"Thank you so much."]
  ],
  curve:{after:2, text:"It came in around nine this morning."},
  facts:[
    ['Caller: Rachel Kim',['rachel','kim']],
    ['Clicked link in package delivery email',['/package|delivery|shipping|ups|fedex/']],
    ['Entered her password on the page',['/(entered|typed|gave|put).{0,30}(password|credential)|password/']],
    ['Reset password',['reset']],
    ['Signed out all sessions',['/sign.{0,5}out|session|revoke/']],
    ['Reported phishing email',['/report|phish/']],
    ['Escalated to security team, follow up today',['security']]
  ],
  curveFact:['Email arrived about 9 AM',['/\\b9\\s*(am|a\\.m|:00|o.?clock)?\\b|nine/']]
}
];
