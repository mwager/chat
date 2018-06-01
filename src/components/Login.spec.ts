import { shallowMount } from '@vue/test-utils';
import Login from '@/components/Login.vue';

const $store = {
  commit: jasmine.createSpy('commit')
};

const factory = (values = {}) => {
  return shallowMount(Login, {
    mocks: {
      $store
    }
  });
};

describe('Login.vue', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = factory();
  });

  it('should render correct content', () => {
    expect(/Choose a username to start chätting/.test(wrapper.text())).toBe(true);
    // console.log(wrapper);
  });

  it('should commit the username to the store given the form gets submitted', () => {
    const input = wrapper.find('input[type="text"]');
    input.element.value = 'fred';
    input.trigger('input'); // v-model updated

    const button = wrapper.find('button[submit]');
    button.trigger('submit');

    expect($store.commit).toHaveBeenCalledWith('SET_USERNAME', 'fred');
  });
});
