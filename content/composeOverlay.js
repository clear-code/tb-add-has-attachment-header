/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var AddHasAttachmentHeaderCompose = {
  addHeader: function(aCompFields) {
    aCompFields.otherRandomHeaders += 'X-Mozilla-Has-Attach: '+ this.headerValue + '\r\n';
  },

  get headerValue() {
    var attachmentsBacket = GetMsgAttachmentElement();
    var attachmentsCount = attachmentsBacket.itemCount;
    return attachmentsCount > 0 ? 'yes' : 'no';
  },

  init: function() {
  },

  handleEvent: function(aEvent) {
    switch (aEvent.type) {
      case 'compose-window-init':
        document.documentElement.addEventListener('compose-window-close', this, false);
        window.addEventListener('unload', this, false);
        gMsgCompose.RegisterStateListener(this);
        return;

      case 'compose-window-close':
        gMsgCompose.UnregisterStateListener(this);
        return;

      case 'unload':
        document.documentElement.removeEventListener('compose-window-init', this, false);
        document.documentElement.removeEventListener('compose-window-close', this, false);
        window.removeEventListener('unload', this, false);
        return;
    }
  },

  // nsIMsgComposeStateListener
  NotifyComposeFieldsReady: function() {},
  NotifyComposeBodyReady: function() {
    setTimeout(this.init.bind(this), 100);
  },
  ComposeProcessDone: function() {},
  SaveInFolderDone: function() {}
};

document.documentElement.addEventListener('compose-window-init', AddHasAttachmentHeaderCompose, false);

(function() {
  var originalRecipients2CompFields = window.Recipients2CompFields;
  window.Recipients2CompFields = function Recipients2CompFields(aCompFields) {
    var returnValue = originalRecipients2CompFields.apply(this, arguments);
    AddHasAttachmentHeaderCompose.addHeader(aCompFields);
    return returnValue;
  };
})();
