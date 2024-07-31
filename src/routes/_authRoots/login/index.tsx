import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { QueryObserverResult, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import * as z from 'zod'
import type { FieldApi } from '@tanstack/react-form'
import { useStore } from 'lib/zustand/store'
import { postData, getMe } from 'services/test.book'
import RenderIf from 'shared/components/RenderIf'
import Input from 'shared/components/Input'
import Button from 'shared/components/Button'
import { IUser } from 'lib/zustand/auth/model'
function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em className='block my-2 text-rose-500'>{field.state.meta.errors.join(", ")}</em>
      ) : null}

    </>
  )
}
const Login = () => {

  const queryClient = useQueryClient();
  const { setToken, setUser } = useStore(state => state)

  const navigate = useNavigate()

  const { refetch } = useQuery({
    queryKey: ['getMyProfile'],
    queryFn: getMe,
    enabled: false,
  })






  const mutation = useMutation({
    mutationFn: postData,
    onSuccess: async (data) => {
      data && setToken(data)
      const { data: profileData }: QueryObserverResult<IUser | undefined, Error> = await refetch();

      if (Object.keys(profileData || {}).length) {
        profileData && setUser(profileData);

        queryClient.resetQueries({ queryKey: ['getMyProfile'] })
        navigate({ to: '/profile', })
      }
    }
  })



  const { Subscribe, handleSubmit, Field } = useForm({
    defaultValues: {
      userName: '',
      password: '',
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      mutation.mutate(value)



    },
  })
  return (
    <>
      <div className='w-[30%]'>
        <img className='mx-auto' loading='lazy' height={200} width={200} src="https://i.ibb.co/zFrg0VR/png-transparent-react-javascript-library-angularjs-web-application-framework-logo-symmetry-web-appli.png" />
        <form
          className='flex flex-col gap-4'
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            handleSubmit()
          }}
        >
          <div>
            <Field
              name="userName"
              validatorAdapter={zodValidator()}
              asyncDebounceMs={500}
              validators={{
                onChangeAsync: z.string().min(4, { message: "You must be 4 to make an account" }),
              }}
              children={(field) => (
                <>
                  <Input
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    classNames='border-2 rounded-full p-2 w-full'
                    placeholder='Enter your name'

                  />
                  <FieldInfo field={field} />
                </>
              )}

            />
          </div>
          <div>
            <Field
              name="password"
              validatorAdapter={zodValidator()}
              asyncDebounceMs={500}
              validators={{
                onChangeAsync: z.string().min(4, { message: "You must be 4 to make an account" }),
              }}
              children={(field) => (
                <>
                  <Input
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    classNames='border-2 rounded-full p-2 w-full'
                    placeholder='Enter your password'

                  />
                  <FieldInfo field={field} />
                </>
              )}

            />
          </div>
          <Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button classNames='text-emerald-50 bg-pink-600 p-3 rounded-full ' type='submit' disabled={!canSubmit}>
                <RenderIf condition={isSubmitting} renderElse={"Submit"}>
                  Submitting...
                </RenderIf>
              </Button>
            )}

          />
        </form>
      </div>
    </>
  )
}
export const Route = createFileRoute('/_authRoots/login/')({

  component: Login
})