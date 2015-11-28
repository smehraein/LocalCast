(function () {
  'use strict';

  angular.module('localCast')
  .controller('MembersCtrl', MembersCtrl);

  MembersCtrl.$inject = ['membersFactory', '$mdDialog', '$stateParams'];

  function MembersCtrl (membersFactory, $mdDialog, $stateParams) {
    var self  = this;
    self.data = {};

    self.getMembers   = getMembers;
    self.addMember    = addMember;
    self.removeMember = removeMember;

    activate();

    function activate () {
      self.data.teamId   = +$stateParams.teamId;
      return getMembers();
    }

    function getMembers () {
      return membersFactory.getMembers(self.data.teamId)
      .then(function (members) {
        self.data.members = members;
      });
    }

    function removeMember (member) {
      return membersFactory.deleteMember(member.id)
      .then(function () {
        return getMembers();
      });
    }

    function addMember () {
      var username = self.data.username;
      self.data.username = '';
      return membersFactory.addMember(username, self.data.teamId)
      .then(function () {
        return getMembers();
      });
    }

  }
})();
