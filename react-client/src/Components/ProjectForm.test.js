import React from 'react';
import { shallow } from 'enzyme';
import ProjectForm from './ProjectForm';
import swal from 'sweetalert2';
import { post } from 'axios';

jest.mock('axios');
jest.mock('sweetalert2');

describe('ProjectForm Component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<ProjectForm />);
    });

    it('should render without errors', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('should update state on input change', () => {
        const event = {
            target: {
                name: 'title',
                value: 'New Project'
            }
        };
        wrapper.instance().handleUserInput(event);
        expect(wrapper.state('title')).toEqual('New Project');
    });

    it('should show error if user ID is missing on submit', () => {
        localStorage.removeItem('id');
        wrapper.instance().handleSubmit({ preventDefault: jest.fn() });
        expect(swal).toHaveBeenCalledWith({ type: 'error', title: 'Post Project', text: 'User ID is missing' });
    });

    it('should show error if form is incomplete on submit', () => {
        localStorage.setItem('id', '123');
        wrapper.setState({ title: '', description: '', skill: '', budget: '', period: '' });
        wrapper.instance().handleSubmit({ preventDefault: jest.fn() });
        expect(swal).toHaveBeenCalledWith({ type: 'error', title: 'Post Project', text: 'Please complete the form' });
    });

    it('should call post API on valid form submit', () => {
        localStorage.setItem('id', '123');
        wrapper.setState({ title: 'Project', description: 'Description', skill: 'Skill', budget: '100', period: '10' });
        post.mockResolvedValue({ data: { successMsg: 'Project posted successfully' } });
        wrapper.instance().handleSubmit({ preventDefault: jest.fn() });
        expect(post).toHaveBeenCalled();
    });

    it('should handle file change correctly', () => {
        const file = new Blob(['file content'], { type: 'application/pdf' });
        const event = { target: { files: [file] }, preventDefault: jest.fn() };
        wrapper.instance()._handleChangeFile(event);
        expect(wrapper.state('file')).toEqual(file);
    });

    it('should show error on invalid file type', () => {
        const file = new Blob(['file content'], { type: 'text/plain' });
        const event = { target: { files: [file] }, preventDefault: jest.fn() };
        wrapper.instance()._handleChangeFile(event);
        expect(swal).toHaveBeenCalledWith({ type: 'error', title: 'File Upload', text: 'Only PDF attachments allowed' });
    });
});