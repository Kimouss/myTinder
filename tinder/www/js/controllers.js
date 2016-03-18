angular.module('starter.controllers', ['ionic', 'ionic.contrib.ui.tinderCards'])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    $scope.loginData = {};

    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    $scope.login = function () {
      $scope.modal.show();
    };

    $scope.doLogin = function () {
      console.log('Doing login', $scope.loginData);

      $timeout(function () {
        $scope.closeLogin();
      }, 1000);
    };
  })

  .controller('PlaylistsCtrl', function ($scope, $http) {
    $http.get('http://94.23.200.181:1337/user/').then(function (value) {
      $scope.playlists = value.data;
    });
  })

  .controller('PlaylistCtrl', function ($scope, $stateParams) {
  })


  .controller('CardsCtrl', function ($scope, TDCardDelegate, $http) {
    var allMembers = {};
    var chooseMembers = [];
    $http.get('http://94.23.200.181:1337/user/').then(function (value) {
      for (var i in value.data) {
        allMembers['id_' + value.data[i].id] = value.data[i];
      }
      $http.get('http://94.23.200.181:1337/like').then(function (value) {
        angular.forEach(value.data, function (choose) {
          if (allMembers['id_' + choose.user_id]) {
            chooseMembers.push(allMembers['id_' + choose.user_id])
          }
          delete allMembers['id_' + choose.user_id];
        });

        console.log(chooseMembers);

        $scope.cards = [];
        angular.forEach(allMembers, function (value) {
          $scope.cards.push(value);
        });
        $scope.cardTypes = $scope.cards;
        $scope.choosenOne = chooseMembers;
      });

    });


    $scope.cardDestroyed = function (index) {
      $scope.cards.splice(index, 1);
    };

    $scope.addCard = function (index) {
      var newCard = $scope.cardTypes[Math.floor(Math.random() * $scope.cardTypes.length)];
      // newCard.id = Math.random();
      // $scope.cards.push(angular.extend({}, newCard));
      // console.log(newCard)
    };

    $scope.cardSwipedLeft = function (index) {
      console.log('LEFT SWIPE');
      $scope.addCard(index);
      console.log($scope.cardTypes[index].id);
      $http.get('http://94.23.200.181:1337/like/create?user_id=' + $scope.cards[index].id + '&status=0');
      $scope.cardDestroyed(index);
    };
    $scope.cardSwipedRight = function (index) {
      console.log('RIGHT SWIPE');
      $scope.addCard(index);
      console.log($scope.cardTypes[index].id);
      $http.get('http://94.23.200.181:1337/like/create?user_id=' + $scope.cards[index].id + '&status=1');
      $scope.cardDestroyed(index);
    };

    $scope.standBy = function (index) {
      $scope.addCard(index);
      $http.get('http://94.23.200.181:1337/like/create?user_id=' + $scope.cards[index].id + '&status=2');
      $scope.cardDestroyed(index);
    }
  })

  .
  controller('CardCtrl', function ($scope, TDCardDelegate, $location, $http) {
    var url = $location.url();
    var UrlArr = url.split('/');
    var cardIndex = UrlArr[UrlArr.length - 1];

    $http.get('http://94.23.200.181:1337/user/find?id=' + cardIndex).then(function (value) {
      $scope.card = value.data;
    })

  })

  .controller('LikedCtrl', function ($scope, TDCardDelegate, $http, $ionicLoading) {
    $http.get('http://94.23.200.181:1337/like/find?status=1').then(function (value) {
      $scope.liked = value.data;
    });
    $http.get('http://94.23.200.181:1337/like/').then(function (value) {
      $scope.selectLiked = value.data;
    });
    $http.get('http://94.23.200.181:1337/user/').then(function (value) {
      $scope.cards = value.data;
    });
    $scope.show = function () {
      $ionicLoading.show({
        template: 'Loading...'
      })
    };
    $scope.hide = function () {
      $ionicLoading.hide()
    };
    $scope.cardRemoveLike = function (index) {
      if ($scope.liked) {
        $http.delete('http://94.23.200.181:1337/like/destroy/' + index);
        $scope.show();
      }
      setTimeout(function () {
        $http.get('http://94.23.200.181:1337/like/find?status=1').then(function (value) {
          $scope.liked = value.data;
          $scope.hide();
        });
      }, 200)
    };
    $scope.refreshLike = function () {
      $scope.show();
      setTimeout(function () {
        $http.get('http://94.23.200.181:1337/like/find?status=1').then(function (value) {
          $scope.liked = value.data;
          $scope.hide();
        });
      }, 200)
    }
  })

  .controller('DislikedCtrl', function ($scope, TDCardDelegate, $http, $ionicLoading) {
    $http.get('http://94.23.200.181:1337/like/find?status=0').then(function (value) {
      $scope.disliked = value.data;
      console.log($scope.disliked);
    })
    $http.get('http://94.23.200.181:1337/like/').then(function (value) {
      $scope.selectDisLiked = value.data;
    })
    $http.get('http://94.23.200.181:1337/user/').then(function (value) {
      $scope.cards = value.data;
    })
    $scope.show = function () {
      $ionicLoading.show({
        template: 'Loading...'
      })
    }
    $scope.hide = function () {
      $ionicLoading.hide()
    }
    $scope.cardRemoveDislike = function (index) {
      if ($scope.disliked) {
        $http.delete('http://94.23.200.181:1337/like/destroy/' + index);
        $scope.show();
      }
      setTimeout(function () {
        $http.get('http://94.23.200.181:1337/like/find?status=0').then(function (value) {
          $scope.disliked = value.data;
          $scope.hide();
        });
      }, 200)
    }
    $scope.refreshDislike = function () {
      $scope.show();
      setTimeout(function () {
        $http.get('http://94.23.200.181:1337/like/find?status=0').then(function (value) {
          $scope.disliked = value.data;
          $scope.hide();
        });
      }, 200)
    }
  })

  .controller('WaitCtrl', function ($scope, TDCardDelegate, $http, $ionicLoading) {
    $http.get('http://94.23.200.181:1337/like/find?status=2').then(function (value) {
      $scope.wait = value.data;
    });
    $http.get('http://94.23.200.181:1337/like/').then(function (value) {
      $scope.selectWait = value.data;
    });
    $http.get('http://94.23.200.181:1337/user/').then(function (value) {
      $scope.cards = value.data;
    });
    $scope.show = function () {
      $ionicLoading.show({
        template: 'Loading...'
      })
    };
    $scope.hide = function () {
      $ionicLoading.hide()
    };
    $scope.cardRemoveWait = function (index) {
      if ($scope.wait) {
        $http.delete('http://94.23.200.181:1337/like/destroy/' + index);
        $scope.show();
      }
      setTimeout(function () {
        $http.get('http://94.23.200.181:1337/like/find?status=2').then(function (value) {
          $scope.wait = value.data;
          $scope.hide();
        })
      }, 200);
    };
    $scope.waitDislike = function (user, like) {
      $scope.cardRemoveWait(like);
      $http.get('http://94.23.200.181:1337/like/create?user_id=' + user + '&status=0');
      $scope.show();
      setTimeout(function () {
        $http.get('http://94.23.200.181:1337/like/find?status=2').then(function (value) {
          $scope.wait = value.data;
        })
      }, 200);
    };
    $scope.waitLike = function (user, like) {
      $scope.cardRemoveWait(like);
      $http.get('http://94.23.200.181:1337/like/create?user_id=' + user + '&status=1');
      $scope.show();
      setTimeout(function () {
        $http.get('http://94.23.200.181:1337/like/find?status=2').then(function (value) {
          $scope.wait = value.data;
          $scope.hide();
        })
      }, 200);
    };
    $scope.refreshWait = function () {
      $scope.show();
      setTimeout(function () {
        $http.get('http://94.23.200.181:1337/like/find?status=2').then(function (value) {
          $scope.wait = value.data;
          $scope.hide();
        });
      }, 200)
    }
  })
;

