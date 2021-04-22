export class Animate {
    cardFlipAnimate(item) {
        var timeline = gsap.timeline();
        timeline.to(item, { duration: 0.4, scaleX: 0 });
        timeline.to(item, { duration: 0.4, scaleX: 1 });
    }


    cardCorrect(item) {
        var timeline = gsap.timeline();
        timeline.to(item, { duration: 0.4, opacity: 0, scaleX: 2, scaleY: 2, zIndex: 99 });
        gsap.delayedCall(0.4, this.hide, [item]);
    }

    hide(item) {
        if (item) document.getElementById(item.id).style.display = 'none';
    }

    updateScore(correct, score, id) {
        let sco = score;
        console.log(score);
        if (correct === true) {
            score += 1500;
        } else score -= 1000;
        var obj = {
            value: sco
        }
        TweenLite.to(obj, 0.4, {
            value: score,
            roundProps: {
                value: 100
            },
            onUpdate: function () {
                document.getElementById(id).innerHTML = obj.value;
            }
        })
        return score;
    }

    cardMove(item, posx, posy, oldx, oldy, dur) {
        var timeline = gsap.timeline({ delay: dur * 0.3 });
        timeline.to(item, { duration: 0.5, x: item.x, y: item.y, width: oldx, height: oldy });
        timeline.to(item, { duration: 0.5, x: posx, y: posy, width: window.innerWidth / 12, height: window.innerWidth / 12, ease: 'back' });
    }
}