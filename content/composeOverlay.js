/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var AddHasAttachmentHeaderCompose = {
  HEADER: 'X-Mozilla-Has-Attachment',

  addHeader: function(aCompFields) {
    aCompFields.otherRandomHeaders += this.HEADER + ': '+ this.headerValue + '\r\n';
  },

  get headerValue() {
    var attachmentsBacket = GetMsgAttachmentElement();
    var attachmentsCount = attachmentsBacket.itemCount;
    return attachmentsCount > 0 ? 'yes' : 'no';
  }
};

(function() {
  var originalRecipients2CompFields = window.Recipients2CompFields;
  window.Recipients2CompFields = function Recipients2CompFields(aCompFields) {
    var returnValue = originalRecipients2CompFields.apply(this, arguments);
    AddHasAttachmentHeaderCompose.addHeader(aCompFields);
    return returnValue;
  };
})();
