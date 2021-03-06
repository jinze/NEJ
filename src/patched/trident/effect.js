/**
 * ------------------------------------------
 * IE7-9实现动画效果
 * @version  1.0
 * @author   cheng-lin(cheng-lin@corp.netease.com)
 * ------------------------------------------
 */
var f = function(){
	var _  = NEJ.P,
    	_f = NEJ.F,
    	_e = _('nej.e'),
    	_v = _('nej.v'),
    	_u = _('nej.u'),
    	_h = _('nej.h'),
    	_p = _('nej.p'),
    	_ut= _('nej.ut');
   	if (_p._$NOT_PATCH.trident) return;
    var _animMap = {
	    'linear'     : _ut._$$AnimLinear,
	    'ease-in'    : _ut._$$AnimEaseIn,
	    'ease-out'   : _ut._$$AnimEaseOut,
	    'ease-in-out': _ut._$$AnimEaseInOut
    };

    /**
     * 执行动画
     * @param  {Node}   动画节点
     * @param  {Array}  动画目标样式:[{width:500px;},{height:500px;}]
     * @param  {String} 动画变换信息
     * @param  {Event}  动画停止的回调
     * @return {nej.h}
     */
    _h.__onStart = (function(){
    	var _sumtime = 0,_isLastOne;
    	// 属性是all的情况，重新构建anim
    	var _doRbAnim = function(_rules,_anim){
    		var _str = '';
    		_u._$forIn(_rules,function(_value,_name){
    			_str += _anim.replace('all',_name)
    		});
    		return _str;
    	}
    	// 适配特殊属性
    	var _doAdap  = function(_value,_prop){
    		if(_prop == 'filter'){
                _value = _u._$fixed(_value,0);
                _value = 'alpha(opacity=' + _value + ')';
            }
            if(_prop == 'z-index')
                _value = _u._$fixed(_value,0);
           	return _value;
    	};
    	// 适配构造器
    	var _doFindCutr = function(_value){
    		return _animMap[_value.split(' ')[2]];
    	};
    	// 解析参数
		var _doParse = function(_node,_value,_rules,_stop,_index){
			var _value= _value.split(' '),
				_prop = _value[0],
				_from = parseFloat(_e._$getStyle(_node,_prop))||0,
				_to   = parseFloat(_rules[_prop]),
				_cutr = _animMap[_value[2]],
				_durt = _value[1].slice(0,-1) * 1000;
				if(_durt > _sumtime){
					_isLastOne = _index;
				}
				// IE6-8
				if(_prop == 'opacity' && nej.p._$KERNEL.release != '5.0'){
					_prop = 'filter';
					var _filter = _e._$getStyle(_node,_prop);
					_from = parseFloat(_filter.split('=')[1])||0;
					_to   = _to * 100;
				}
				var _options = {
				    from:{
			            offset:_from
			        },
			        to:{
			            offset:_to
			        },
			        duration:_durt,
			        onupdate:function(_offset){
				        var _value = _offset.offset;
				        if(!_h.__doCheckProp(_prop)){
				        	_value = _doAdap(_value,_prop)
			                _e._$setStyle(_node,_prop,_value);
			            }else
			            	_e._$setStyle(_node,_prop,_value + 'px');
			        },
			        onstop:function(_prop){
			            var _effect = _node.effects[_index];
			            	_effect = _cutr._$recycle(_effect);
			            if(_isLastOne == _index)
			            	_stop();
			        }._$bind(this,_index)
				};
				return _options;
		};
		return function(_node,_rules,_anim,_stop){
			var _effects   = [];
			if(_anim.indexOf('all') > -1)
				_anim = _doRbAnim(_rules,_anim);
			var _animArray = _anim.split(',');
			_node.effects  = [];
			_u._$forEach(_animArray,function(_value,_index){
				if(_value == '')
					return false;
			  	var _options = _doParse(_node,_value,_rules,_stop,_index);
			  	_effects.push({o:_options,c:_doFindCutr(_value)});
			  	_node.effects.push(0);
			});
			_u._$forEach(_effects,function(_item,_index){
				var _effect = _item.c._$allocate(_item.o);
				_node.effects[_index] = _effect;
				_effect._$play();
			});
			return this;
		};
    })(); 

    /**
     * 取消动画
     * @param  {Node}   动画节点
     * @return {nej.h}
     */
    _h.__onStop = function(_node){
		_u._$forEach(_node.effects,function(_o){
			_o._$stop();
		});
		return this;
    };

    /**
     * 暂停动画
     * @param  {Node}   动画节点
     * @param  {String} 暂停时的节点样式
     * @return {nej.h} 
     
    _h.__onPaused = function(_node,_state){
        return this;
    };

    /**
     * 暂停后重新开始动画
     * @param  {Node}   动画节点
     * @return {nej.h} 
     
    _h.__onRestart = function(_node,_rules,_anim){
        return this;
    };*/

};
NEJ.define('{lib}patched/trident/effect.js',
      ['{lib}patched/effect.js'
      ,'{lib}util/animation/linear.js'
      ,'{lib}util/animation/easein.js'
      ,'{lib}util/animation/easeout.js'
      ,'{lib}util/animation/easeinout.js'],f);