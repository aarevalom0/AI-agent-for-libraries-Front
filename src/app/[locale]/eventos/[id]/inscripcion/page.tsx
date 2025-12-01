'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState, use } from 'react';
import { useRouter } from '@/i18n/routing';
import { inscribirUsuarioEvento } from '@/services/eventService';

export default function EventRegistrationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const t = useTranslations('eventos');
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  
  const validateEmail = (email: string): boolean => {
    if (/\s/.test(email)) {
      setEmailError(t('emailNoSpaces') || 'El correo no puede contener espacios');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setEmailError(t('emailInvalid') || 'Ingrese un correo válido (debe contener @ y un dominio válido)');
      return false;
    }
    setEmailError('');
    return true;
  };
  
  const validateNames = (firstName: string, lastName: string): boolean => {
    if (firstName.trim() !== firstName || lastName.trim() !== lastName) {
      setNameError(t('nameNoSpaces') || 'Los nombres no pueden tener espacios al inicio o final');
      return false;
    }
    setNameError('');
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const email = formData.get('email') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    
    if (!validateEmail(email) || !validateNames(firstName, lastName)) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Obtener usuario actual del localStorage
      const currentUser = typeof window !== 'undefined' 
        ? JSON.parse(localStorage.getItem('lecturium_current_user') || '{}') 
        : {};
      
      const comentarios = formData.get('comments') as string;
      
      const inscripcionData: any = {
        usuario_id: currentUser.id || `temp-user-${Date.now()}`, // Usa el ID real del usuario logueado
        nombre: `${firstName} ${lastName}`,
        email: email,
        telefono: formData.get('phone') as string,
        experiencia: formData.get('experience') as string,
        tiene_libro: formData.get('hasBook') === 'on',
      };
      
      // Solo incluir comentarios si no está vacío
      if (comentarios && comentarios.trim() !== '') {
        inscripcionData.comentarios = comentarios;
      }
      
      console.log('📝 Enviando inscripción:', inscripcionData);
      
      // Llamar al backend
      await inscribirUsuarioEvento(id, inscripcionData);
      
      console.log('✅ Inscripción exitosa');
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Mostrar mensaje de éxito por 3 segundos y luego redireccionar
      setTimeout(() => {
        router.push(`/eventos/${id}`);
      }, 3000);
      
    } catch (error) {
      console.error('❌ Error al inscribir:', error);
      setIsSubmitting(false);
      alert(t('errorInscripcion') || 'Hubo un error al procesar tu inscripción. Intenta nuevamente.');
    }
  };
  
  // Mostrar mensaje de éxito
  if (showSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 48 48">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">
            {t('registrationSuccess')}
          </h2>
          <p className="text-green-700 mb-4">
            {t('registrationSuccessMessage')}
          </p>
          <p className="text-sm text-green-600">
            {t('redirectingMessage')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <title>{t('registrationPageTitle')}</title>
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link href="/eventos" className="hover:text-[var(--colorPrincipal)]">{t('eventsNav')}</Link></li>
            <li aria-hidden="true">›</li>
            <li><Link href={`/eventos/${id}`} className="hover:text-[var(--colorPrincipal)]">{t('eventDetail')}</Link></li>
            <li aria-hidden="true">›</li>
            <li aria-current="page" className="text-gray-900">{t('registration')}</li>
          </ol>
        </nav>

        <header className="mb-8 text-center">
          <h1 className="font-serif text-3xl text-[var(--colorPrincipal)] mb-2">
            {t('registrationTitle')}
          </h1>
          <p className="text-gray-600">
            {t('registrationSubtitle')}
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Información personal */}
            <fieldset className="space-y-4">
              <legend className="text-lg font-semibold text-[var(--colorPrincipal)] mb-4">
                {t('personalInfo')}
              </legend>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label 
                    htmlFor="firstName" 
                    className="block text-sm font-medium text-gray-700 mb-1"
                    title={t('firstNameTooltip')}
                  >
                    {t('firstName')} *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--colorPrincipal)] focus:border-transparent"
                    placeholder={t('firstNamePlaceholder')}
                    title={t('firstNameTooltip')}
                  />
                </div>
                
                <div>
                  <label 
                    htmlFor="lastName" 
                    className="block text-sm font-medium text-gray-700 mb-1"
                    title={t('lastNameTooltip')}
                  >
                    {t('lastName')} *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--colorPrincipal)] focus:border-transparent"
                    placeholder={t('lastNamePlaceholder')}
                    title={t('lastNameTooltip')}
                  />
                </div>
              </div>
              
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                  title={t('emailTooltip')}
                >
                  {t('email')} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  pattern="[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--colorPrincipal)] focus:border-transparent ${
                    emailError ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={t('emailPlaceholder')}
                  title={t('emailTooltip')}
                  onChange={(e) => validateEmail(e.target.value)}
                />
                {emailError && (
                  <p className="mt-1 text-sm text-red-600">{emailError}</p>
                )}
              </div>
              
              <div>
                <label 
                  htmlFor="phone" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                  title={t('phoneTooltip')}
                >
                  {t('phone')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--colorPrincipal)] focus:border-transparent"
                  placeholder={t('phonePlaceholder')}
                  title={t('phoneTooltip')}
                />
              </div>
            </fieldset>

            {/* Preferencias del evento */}
            <fieldset className="space-y-4">
              <legend className="text-lg font-semibold text-[var(--colorPrincipal)] mb-4">
                {t('eventPreferences')}
              </legend>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t('readingExperience')}
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="experience"
                      value="beginner"
                      className="mr-2"
                      title={t('beginnerTooltip')}
                    />
                    {t('beginner')}
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="experience"
                      value="intermediate"
                      className="mr-2"
                      title={t('intermediateTooltip')}
                    />
                    {t('intermediate')}
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="experience"
                      value="advanced"
                      className="mr-2"
                      title={t('advancedTooltip')}
                    />
                    {t('advanced')}
                  </label>
                </div>
              </div>
              
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="hasBook"
                    className="mr-2"
                    title={t('hasBookTooltip')}
                  />
                  {t('hasBook')}
                </label>
              </div>
              
              <div>
                <label 
                  htmlFor="comments" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                  title={t('commentsTooltip')}
                >
                  {t('comments')}
                </label>
                <textarea
                  id="comments"
                  name="comments"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--colorPrincipal)] focus:border-transparent"
                  placeholder={t('commentsPlaceholder')}
                  title={t('commentsTooltip')}
                ></textarea>
              </div>
            </fieldset>

            {/* Términos y condiciones */}
            <div className="border-t pt-6">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="terms"
                  required
                  className="mr-2 mt-1"
                  title={t('termsTooltip')}
                />
                <span className="text-sm text-gray-600">
                  {t('termsText')} <Link href="/terms" className="text-[var(--colorPrincipal)] hover:underline">{t('termsLink')}</Link>
                </span>
              </label>
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[var(--colorPrincipal)] focus:ring-opacity-50 ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-[var(--colorPrincipal)] text-white hover:opacity-90'
                }`}
                title={t('submitRegistrationTooltip')}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('submitting')}
                  </span>
                ) : (
                  t('submitRegistration')
                )}
              </button>
              <Link
                href={`/eventos/${id}`}
                className="flex-1 text-center border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
                title={t('cancelTooltip')}
              >
                {t('cancel')}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}