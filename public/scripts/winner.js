$(function(){
    var calculateWinner = {
        init: function(){
            this.events();
            this.getData('/votes');
        },
        data: {

        },
        events: function(){

        },
        getData: function(url){
            var self = this;
            $.getJSON(url, function(d){
                // if we had more time...
                // we wouldn't be doin' this ugly js stuff
                self.data.sums = self.prettifyData(d);
                self.data.totalRating = self.getTotals(self.data.sums);

                self.returnWinner($('.dishname'), $('.rating'));
            });
        },
        prettifyData: function(data){
            var obj = {};
            $.each(data, function(i, vote){
                if (typeof obj[vote.id] === 'undefined'){
                    obj[vote.id] = {
                        dishname: vote.dishname,
                        votecount: 1,
                        cat : {
                            color: parseInt(vote.color, 10),
                            taste: parseInt(vote.taste, 10),
                            consistency: parseInt(vote.consistency, 10),
                            aroma: parseInt(vote.aroma, 10)
                        }
                    }
                } else {
                    var chili = obj[vote.id];
                    chili.votecount++;
                    chili.cat.color += parseInt(vote.color, 10);
                    chili.cat.taste += parseInt(vote.taste, 10);
                    chili.cat.consistency += parseInt(vote.consistency, 10);
                    chili.cat.aroma += parseInt(vote.aroma, 10);
                }
            });

            return obj;
        },
        getTotals: function(data){
            var obj = {};
            $.each(data, function(i, chili){
                var total = 0;
                $.each(chili.cat, function(i, criterion){
                    total += criterion;
                });
                var rating = total / chili.votecount;
                obj[i] = {
                    dishname: chili.dishname,
                    rating : rating
                }
            });
            return obj;
        },
        returnWinner: function(winnerContainer, ratingContainer){
            var self = this;

            var winner = self.getHighestRating(self.data.totalRating, 'rating');
            winnerContainer.html(winner.dishname);
            ratingContainer.html(winner.rating.toFixed(2));
        },
        getHighestRating: function(d, prop){
            var highest = 0,
                winner;

            $.each(d, function(i, chili) {
                if (chili[prop] > highest) {
                    highest = chili[prop];
                    winner = chili;
                };
            });

            return winner;
        }
    }

    calculateWinner.init();
});
